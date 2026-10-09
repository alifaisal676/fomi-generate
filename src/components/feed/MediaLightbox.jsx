'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Copy, Download, X } from 'lucide-react';
import MediaImage from '@/components/ui/MediaImage';
import { useToast } from '@/components/ui/Toast';
import { getAspectRatio } from '@/data/aspectRatios';

const BUTTON =
  'inline-flex h-10 items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-medium text-white backdrop-blur-sm transition-[background-color,transform] duration-150 hover:bg-white/25 active:scale-95';
const ARROW =
  'absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-[background-color,transform] duration-150 hover:bg-black/70 active:scale-90';

/** Loaded on demand (next/dynamic) the first time a tile is opened. */
export default function MediaLightbox({ batch, index, onClose, onNavigate, onRestoreFocus }) {
  const toast = useToast();
  const item = batch.items[index];
  const total = batch.items.length;
  const ratio = getAspectRatio(batch.settings.ratio).value;
  const isVideo = item.type === 'video';
  const title = `${isVideo ? 'Video' : 'Image'} ${index + 1} of ${total}`;

  const go = (delta) => onNavigate((index + delta + total) % total);
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'ArrowLeft') go(-1);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(batch.prompt);
      toast.show('Prompt copied');
    } catch {
      toast.show('Could not copy the prompt');
    }
  };

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm" />
        <Dialog.Content
          onKeyDown={handleKeyDown}
          onCloseAutoFocus={onRestoreFocus}
          className="data-[state=open]:animate-popover-in fixed top-1/2 left-1/2 z-[81] flex w-[min(96vw,60rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 outline-none"
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>

          <div
            className="relative max-w-full overflow-hidden rounded-[18px] bg-black/30"
            style={{ aspectRatio: ratio, width: `min(100%, calc(74dvh * ${ratio}))` }}
          >
            {isVideo ? (
              <video
                key={item.id}
                src={item.src}
                poster={item.poster}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="size-full bg-black object-contain"
              />
            ) : (
              <MediaImage
                key={item.id}
                src={item.src}
                alt={`${title}: ${batch.prompt}`}
                sizes="90vw"
                preload
                className="object-contain"
              />
            )}

            {total > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => go(-1)}
                  className={`${ARROW} left-2`}
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => go(1)}
                  className={`${ARROW} right-2`}
                >
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
              </>
            )}
          </div>

          <Dialog.Description className="line-clamp-2 max-w-prose text-center text-sm text-white/90">
            {batch.prompt}
          </Dialog.Description>

          <div className="flex flex-wrap justify-center gap-2">
            <a href={item.src} download className={BUTTON}>
              <Download aria-hidden="true" className="size-4" />
              Download
            </a>
            <button type="button" onClick={copyPrompt} className={BUTTON}>
              <Copy aria-hidden="true" className="size-4" />
              Copy prompt
            </button>
            <Dialog.Close className={BUTTON}>
              <X aria-hidden="true" className="size-4" />
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
