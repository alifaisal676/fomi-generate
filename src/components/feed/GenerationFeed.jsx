import { memo } from 'react';
import { RotateCcw } from 'lucide-react';
import EmptyState from './EmptyState';
import GenerationBatch from './GenerationBatch';

function FeedSkeleton() {
  return (
    <div role="status" className="grid gap-3 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-4">
      <span className="sr-only">Loading your generations</span>
      <div aria-hidden="true" className="skeleton min-h-40 rounded-[18px]" />
      <div aria-hidden="true" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="skeleton aspect-[2/3] rounded-[14px]" />
        ))}
      </div>
    </div>
  );
}

function LoadError({ onReload }) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-sm flex-col items-center gap-3 py-12 text-center"
    >
      <p className="text-ink text-sm">We couldn&apos;t load your generations.</p>
      <button
        type="button"
        onClick={onReload}
        className="bg-accent text-on-accent hover:bg-accent-strong inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-[transform,background-color] duration-150 active:scale-95"
      >
        <RotateCcw aria-hidden="true" className="size-4" />
        Try again
      </button>
    </div>
  );
}

/** Memoized: typing in the prompt re-renders Workspace but not the feed. */
function GenerationFeed({ status, batches, highlightedId, onReload, onPickPrompt, ...handlers }) {
  if (status === 'loading') return <FeedSkeleton />;
  if (status === 'error' && batches.length === 0) return <LoadError onReload={onReload} />;
  if (batches.length === 0) return <EmptyState onPickPrompt={onPickPrompt} />;

  return (
    <section aria-label="Generations" className="space-y-6">
      {batches.map((batch, index) => (
        <GenerationBatch
          key={batch.id}
          batch={batch}
          isFirst={index === 0}
          isHighlighted={batch.id === highlightedId}
          {...handlers}
        />
      ))}
    </section>
  );
}

export default memo(GenerationFeed);
