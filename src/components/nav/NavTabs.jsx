'use client';

import { useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import { useToast } from '@/components/ui/Toast';
import MegaMenu from './MegaMenu';
import NavIconButton from './NavIconButton';
import { NAV_ITEMS } from './navConfig';
import { NAV_MENUS } from './navMenus';

const HOVER_OPEN_DELAY = 90;
const HOVER_CLOSE_DELAY = 180;

/**
 * One <nav> for every breakpoint: centered in the header on md+,
 * a fixed bottom tab bar on mobile. Icons with a menu act as disclosure buttons:
 * hover (mouse), click/tap, Enter/Space all open; Esc, outside click or Tab-away close.
 */
export default function NavTabs({ activeId }) {
  const toast = useToast();
  const navRef = useRef(null);
  const timer = useRef(null);
  const panelId = useId();
  const [openId, setOpenId] = useState(null);

  const clearTimer = () => clearTimeout(timer.current);
  const scheduleOpen = (id) => {
    clearTimer();
    timer.current = setTimeout(() => setOpenId(id), openId ? 0 : HOVER_OPEN_DELAY);
  };
  const scheduleClose = () => {
    clearTimer();
    timer.current = setTimeout(() => setOpenId(null), HOVER_CLOSE_DELAY);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!openId) return;
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) setOpenId(null);
    };
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      navRef.current?.querySelector('[aria-expanded="true"]')?.focus();
      setOpenId(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openId]);

  const handleClick = (item) => {
    clearTimer();
    if (item.menu) {
      setOpenId((current) => (current === item.id ? null : item.id));
    } else if (item.id !== activeId) {
      setOpenId(null);
      toast.show(`${item.label} is coming soon`);
    }
  };

  const handlePointerEnter = (event, item) => {
    if (event.pointerType !== 'mouse') return;
    if (item.menu) scheduleOpen(item.id);
    else if (openId) scheduleClose();
  };

  const handleSelect = (menuItem) => {
    setOpenId(null);
    if (!menuItem.current) toast.show(`${menuItem.label} is coming soon`);
  };

  const handleBlur = (event) => {
    // Tabbing out of the nav closes the menu; clicking blank panel space (relatedTarget null) does not.
    if (event.relatedTarget && !navRef.current?.contains(event.relatedTarget)) setOpenId(null);
  };

  const openMenu = openId ? NAV_MENUS[NAV_ITEMS.find((item) => item.id === openId)?.menu] : null;

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      onPointerEnter={clearTimer}
      onPointerLeave={(event) => event.pointerType === 'mouse' && scheduleClose()}
      onBlur={handleBlur}
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
          isOpen={item.id === openId}
          panelId={panelId}
          onClick={() => handleClick(item)}
          onPointerEnter={(event) => handlePointerEnter(event, item)}
        />
      ))}

      {openMenu && <MegaMenu id={panelId} menu={openMenu} onSelect={handleSelect} />}
    </nav>
  );
}
