import { memo } from 'react';
import clsx from 'clsx';
import { RotateCcw, TriangleAlert, X } from 'lucide-react';
import { getAspectRatio } from '@/data/aspectRatios';
import MediaTile from './MediaTile';
import PromptCard from './PromptCard';

function GenerationBatch({ batch, isHighlighted, onReuse, onRetry, onDismiss, onOpen }) {
  const { status, settings } = batch;
  const isVideo = settings.mode === 'video';
  const aspect = getAspectRatio(settings.ratio).value;
  const slots = isVideo ? 1 : settings.count;
  const wide = isVideo && aspect >= 1 ? 'col-span-2' : undefined; // landscape clips get half the row

  return (
    <article
      id={`batch-${batch.id}`}
      aria-busy={status === 'loading'}
      className={clsx(
        'animate-fade-up grid scroll-mt-[var(--strip-offset)] gap-3 rounded-[22px] transition-shadow duration-500 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-4',
        isHighlighted && 'ring-accent-strong ring-offset-bg ring-2 ring-offset-4',
      )}
    >
      <PromptCard batch={batch} onReuse={onReuse} />

      <div className="grid grid-cols-2 content-start gap-3 sm:grid-cols-4">
        {status === 'loading' &&
          Array.from({ length: slots }, (_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={clsx('skeleton rounded-[14px]', wide)}
              style={{ aspectRatio: aspect }}
            />
          ))}

        {status === 'error' && (
          <div
            role="alert"
            className="border-accent-strong/50 bg-surface/60 col-span-full flex flex-col items-center justify-center gap-3 rounded-[14px] border border-dashed px-4 py-8 text-center"
          >
            <TriangleAlert aria-hidden="true" className="text-accent-strong size-6" />
            <p className="text-ink max-w-xs text-sm">{batch.error}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onRetry(batch)}
                className="bg-accent text-on-accent hover:bg-accent-strong inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-[transform,background-color] duration-150 active:scale-95"
              >
                <RotateCcw aria-hidden="true" className="size-4" />
                Retry
              </button>
              <button
                type="button"
                onClick={() => onDismiss(batch.id)}
                className="border-line bg-surface text-ink hover:bg-selected inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-[transform,background-color] duration-150 active:scale-95"
              >
                <X aria-hidden="true" className="size-4" />
                Dismiss
              </button>
            </div>
          </div>
        )}

        {status === 'done' &&
          batch.items.map((item, index) => (
            <MediaTile
              key={item.id}
              item={item}
              index={index}
              total={batch.items.length}
              batch={batch}
              aspect={aspect}
              onOpen={onOpen}
              className={wide}
            />
          ))}
      </div>
    </article>
  );
}

export default memo(GenerationBatch);
