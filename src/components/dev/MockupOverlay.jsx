'use client';

import { useEffect, useState } from 'react';

/**
 * Dev-only pixel-compare helper. Put the mockup at /public/dev/mockup.png, then:
 *   O  toggle overlay    =  more opaque    -  less opaque
 * Resize the browser to ~1440px wide so the 904px mockup scales up to fit.
 * Safe to delete (plus /public/dev) before submitting.
 */
export default function MockupOverlay() {
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0.5);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
      if (event.key === 'o') setVisible((v) => !v);
      if (event.key === '=') setOpacity((o) => Math.min(1, +(o + 0.1).toFixed(1)));
      if (event.key === '-') setOpacity((o) => Math.max(0.1, +(o - 0.1).toFixed(1)));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!visible) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/dev/mockup.png"
      alt=""
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] w-full"
      style={{ opacity }}
    />
  );
}
