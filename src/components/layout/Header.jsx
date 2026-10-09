import NavTabs from '@/components/nav/NavTabs';
import HeaderActions from './HeaderActions';
import Logo from './Logo';
import ProgressBar from './ProgressBar';

/** `progress` (0..1) is driven by the generation flow; null shows the resting segment. */
export default function Header({ progress = null }) {
  return (
    <header className="bg-bg relative z-40 shrink-0">
      <div className="grid h-14 grid-cols-[auto_1fr_auto] items-center gap-3 px-3 md:h-[84px] md:grid-cols-[1fr_auto_1fr] md:px-6 lg:px-12">
        <div>
          <Logo />
        </div>

        <div className="flex flex-col items-center gap-2.5">
          {/* Hairline at the top edge on mobile; centered track above the icons on md+ */}
          <ProgressBar
            progress={progress}
            className="md:ring-line fixed inset-x-0 top-0 z-50 h-[3px] md:static md:h-2 md:w-[22rem] md:rounded-full md:ring-1 md:ring-inset"
          />
          <NavTabs activeId="image" />
        </div>

        <HeaderActions />
      </div>
    </header>
  );
}
