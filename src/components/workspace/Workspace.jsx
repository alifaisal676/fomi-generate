'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import GenerationFeed from '@/components/feed/GenerationFeed';
import GeneratorPanel from '@/components/generator/GeneratorPanel';
import HistoryStrip from '@/components/history/HistoryStrip';
import Header from '@/components/layout/Header';
import { useToast } from '@/components/ui/Toast';
import { useGenerations } from '@/hooks/useGenerations';
import { useGeneratorSettings } from '@/hooks/useGeneratorSettings';
import MobileComposer from './MobileComposer';

// Code-split: the lightbox is only downloaded the first time someone opens a tile.
const MediaLightbox = dynamic(() => import('@/components/feed/MediaLightbox'));

/** Client composition root: wires generator <-> feed <-> history <-> header progress. */
export default function Workspace({ historyItems }) {
  const toast = useToast();
  const feedRef = useRef(null);
  const openerRef = useRef(null); // element that opened the lightbox, to return focus to
  const { settings, update, setMode } = useGeneratorSettings();
  const { status, batches, progress, isGenerating, generate, retry, dismiss, reload } =
    useGenerations();

  const [lightbox, setLightbox] = useState(null); // { batchId, index }
  const [highlightedId, setHighlightedId] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleGenerate = useCallback(async () => {
    setSheetOpen(false);
    feedRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    const result = await generate(settings);
    toast.show(
      result.ok
        ? settings.mode === 'video'
          ? 'Your video is ready'
          : 'Your images are ready'
        : 'Generation failed. You can retry it.',
    );
  }, [generate, settings, toast]);

  const handleRetry = useCallback((batch) => retry(batch), [retry]);

  const handleReuse = useCallback(
    (batch) => {
      update(batch.settings);
      toast.show('Settings applied to the generator');
    },
    [update, toast],
  );

  const handlePickPrompt = useCallback((prompt) => update({ prompt }), [update]);
  const handleOpen = useCallback((batchId, index) => {
    openerRef.current = document.activeElement;
    setLightbox({ batchId, index });
  }, []);
  const handleRestoreFocus = useCallback((event) => {
    event.preventDefault();
    openerRef.current?.focus();
  }, []);
  const handleCloseLightbox = useCallback(() => setLightbox(null), []);

  // History = finished batches from this session + the older static items.
  const historyList = useMemo(
    () => [
      ...batches
        .filter((batch) => batch.status === 'done' && batch.items.length > 0)
        .map((batch) => ({
          id: batch.id,
          prompt: batch.prompt,
          thumb: batch.items[0].poster ?? batch.items[0].src,
        })),
      ...historyItems,
    ],
    [batches, historyItems],
  );

  const handleHistorySelect = useCallback(
    (id) => {
      if (batches.some((batch) => batch.id === id)) {
        document
          .getElementById(`batch-${id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setHighlightedId(id);
        setTimeout(() => setHighlightedId(null), 1800);
        return;
      }
      // Older item with no batch in this session: load its prompt to recreate it.
      const item = historyItems.find((entry) => entry.id === id);
      if (item) {
        update({ prompt: item.prompt });
        toast.show('Prompt loaded from history');
      }
    },
    [batches, historyItems, update, toast],
  );

  const lightboxBatch = lightbox && batches.find((batch) => batch.id === lightbox.batchId);

  const generatorPanel = (
    <GeneratorPanel
      settings={settings}
      onChange={update}
      onModeChange={setMode}
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
    />
  );

  return (
    <>
      <Header progress={progress} />

      <div className="relative min-h-0 flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <HistoryStrip items={historyList} onSelect={handleHistorySelect} />

        <div className="grid h-full min-h-0 grid-cols-1 gap-4 px-3 md:grid-cols-[17rem_minmax(0,1fr)] md:px-6 lg:grid-cols-[19rem_minmax(0,1fr)] lg:px-12">
          <aside
            aria-label="Generator"
            className="thin-scroll bg-panel mt-[var(--strip-offset)] mb-3 hidden overflow-y-auto rounded-[24px] p-4 md:block"
          >
            {generatorPanel}
          </aside>

          <main
            ref={feedRef}
            id="feed"
            tabIndex={-1}
            className="thin-scroll min-h-0 overflow-y-auto pt-[var(--strip-offset)] pb-28 focus:outline-none md:pb-6"
          >
            <h1 className="sr-only">Create images and videos</h1>
            <GenerationFeed
              status={status}
              batches={batches}
              highlightedId={highlightedId}
              onReload={reload}
              onPickPrompt={handlePickPrompt}
              onReuse={handleReuse}
              onRetry={handleRetry}
              onDismiss={dismiss}
              onOpen={handleOpen}
            />
          </main>
        </div>
      </div>

      <MobileComposer prompt={settings.prompt} open={sheetOpen} onOpenChange={setSheetOpen}>
        {generatorPanel}
      </MobileComposer>

      {lightboxBatch && lightboxBatch.items[lightbox.index] && (
        <MediaLightbox
          batch={lightboxBatch}
          index={lightbox.index}
          onClose={handleCloseLightbox}
          onRestoreFocus={handleRestoreFocus}
          onNavigate={(index) => setLightbox({ batchId: lightbox.batchId, index })}
        />
      )}
    </>
  );
}
