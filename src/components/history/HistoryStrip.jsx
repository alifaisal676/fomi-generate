'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import HistoryThumb from './HistoryThumb';

/** Floating strip of recent generations. Overlaps the top of the feed (see --strip-* tokens). */
export default function HistoryStrip({ items, onSelect }) {
  const toast = useToast();
  const scrollerRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  // Let a vertical mouse wheel scroll the strip sideways, but only while it can
  // still move in that direction, so the page never feels "stuck".
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const canScroll =
        (event.deltaY > 0 && scroller.scrollLeft < maxScroll - 1) ||
        (event.deltaY < 0 && scroller.scrollLeft > 1);
      if (!canScroll) return;
      event.preventDefault();
      scroller.scrollLeft += event.deltaY;
    };

    scroller.addEventListener('wheel', onWheel, { passive: false });
    return () => scroller.removeEventListener('wheel', onWheel);
  }, []);

  const handleSelect = useCallback(
    (id) => {
      setActiveId(id);
      onSelect?.(id);
    },
    [onSelect],
  );

  return (
    <section
      aria-label="Generation history"
      className="absolute inset-x-3 top-[var(--strip-top)] z-30 md:inset-x-6 lg:inset-x-12"
    >
      <div className="border-line bg-surface/90 shadow-float flex h-[var(--strip-h)] items-center gap-2 rounded-[20px] border px-2.5 backdrop-blur-md md:gap-3 md:px-3">
        <div className="bg-surface ring-line flex h-[calc(100%-1.25rem)] w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-xl ring-1 md:w-[4.75rem]">
          <h2 className="text-[13px] leading-tight font-semibold">History</h2>
          <button
            type="button"
            onClick={() => toast.show('Full history is coming soon')}
            className="text-muted hover:text-link rounded text-[10px] leading-tight underline-offset-2 transition-colors hover:underline"
          >
            View all
          </button>
        </div>

        <div aria-hidden="true" className="bg-line h-9 w-[3px] shrink-0 rounded-full" />

        <div ref={scrollerRef} className="no-scrollbar mask-fade-x min-w-0 flex-1 overflow-x-auto">
          <ul className="flex snap-x snap-proximity items-center gap-3 px-3 py-2.5 md:gap-4">
            {items.map((item) => (
              <HistoryThumb
                key={item.id}
                item={item}
                isActive={item.id === activeId}
                onSelect={handleSelect}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
