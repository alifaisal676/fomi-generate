import Header from '@/components/layout/Header';
import HistoryStrip from '@/components/history/HistoryStrip';
import { HISTORY_ITEMS } from '@/lib/mockData';

export default function HomePage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <a
        href="#feed"
        className="focus:bg-ink focus:text-bg sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to results
      </a>

      <Header />

      <div className="relative min-h-0 flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        {/* Floats over the top of the feed, exactly like the mockup */}
        <HistoryStrip items={HISTORY_ITEMS} />

        <div className="grid h-full min-h-0 grid-cols-1 gap-4 px-3 md:grid-cols-[17rem_minmax(0,1fr)] md:px-6 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:px-12">
          {/* Stage 2: <GeneratorPanel /> */}
          <aside
            aria-label="Generator"
            className="bg-panel mt-[var(--strip-offset)] mb-3 hidden overflow-y-auto rounded-[24px] p-4 md:block"
          >
            <p className="text-muted text-sm">Generator panel</p>
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
    </div>
  );
}
