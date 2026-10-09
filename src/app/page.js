import Workspace from '@/components/workspace/Workspace';
import { HISTORY_ITEMS } from '@/lib/mockData';

export default function HomePage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <a
        href="#feed"
        className="focus:bg-ink focus:text-bg sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to results
      </a>

      <Workspace historyItems={HISTORY_ITEMS} />
    </div>
  );
}
