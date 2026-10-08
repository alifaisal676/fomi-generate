'use client';

import clsx from 'clsx';
import { useToast } from '@/components/ui/Toast';
import NavIconButton from './NavIconButton';
import { NAV_ITEMS } from './navConfig';

/**
 * One <nav> for every breakpoint: centered in the header on md+,
 * a fixed bottom tab bar on mobile (thumb-reachable, no duplicate landmarks).
 */
export default function NavTabs({ activeId }) {
  const toast = useToast();

  return (
    <nav
      aria-label="Primary"
      className={clsx(
        'border-line bg-bg/95 fixed inset-x-0 bottom-0 z-40 flex min-h-14 items-center justify-around border-t px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur',
        'md:static md:z-auto md:min-h-0 md:justify-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none',
      )}
    >
      {NAV_ITEMS.map((item) => (
        <NavIconButton
          key={item.id}
          item={item}
          isActive={item.id === activeId}
          onUnavailable={() => toast.show(`${item.label} is coming soon`)}
        />
      ))}
    </nav>
  );
}
