'use client';

import { useCallback, useState } from 'react';
import GeneratorPanel from '@/components/generator/GeneratorPanel';
import HistoryStrip from '@/components/history/HistoryStrip';
import { useToast } from '@/components/ui/Toast';
import { useGeneratorSettings } from '@/hooks/useGeneratorSettings';

/** Client-side composition root: owns generator state, wires panel <-> feed <-> history. */
export default function Workspace({ historyItems }) {
  const toast = useToast();
  const { settings, update, setMode } = useGeneratorSettings();
  const [isGenerating, setIsGenerating] = useState(false);

  // Stage 3 replaces this stub with the mock API call + feed updates.
  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    const what =
      settings.mode === 'video'
        ? 'your video'
        : `${settings.count} image${settings.count === 1 ? '' : 's'}`;
    toast.show(`Generating ${what} ...`);
    setTimeout(() => setIsGenerating(false), 1800);
  }, [settings.mode, settings.count, toast]);

  return (
    <div className="relative min-h-0 flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <HistoryStrip items={historyItems} />

      <div className="grid h-full min-h-0 grid-cols-1 gap-4 px-3 md:grid-cols-[17rem_minmax(0,1fr)] md:px-6 lg:grid-cols-[19rem_minmax(0,1fr)] lg:px-12">
        <aside
          aria-label="Generator"
          className="thin-scroll bg-panel mt-[var(--strip-offset)] mb-3 hidden overflow-y-auto rounded-[24px] p-4 md:block"
        >
          <GeneratorPanel
            settings={settings}
            onChange={update}
            onModeChange={setMode}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </aside>

        {/* Stage 3: <GenerationFeed /> scrolls underneath the history strip */}
        <main
          id="feed"
          tabIndex={-1}
          className="thin-scroll min-h-0 overflow-y-auto pt-[var(--strip-offset)] pb-6 focus:outline-none"
        >
          <h1 className="sr-only">Create images and videos</h1>
          <p className="text-muted text-sm">Your results will appear here.</p>
        </main>
      </div>
    </div>
  );
}
