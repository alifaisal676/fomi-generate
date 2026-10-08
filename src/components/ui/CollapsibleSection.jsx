'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

/** Full-width pill row that expands smoothly. Collapsed content is `inert` so Tab skips it. */
export default function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <section>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="bg-surface text-ink hover:bg-selected relative flex h-11 w-full items-center justify-center rounded-full text-sm font-medium shadow-[0_1px_0_var(--line)] transition-[background-color,transform] duration-150 active:scale-[0.99]"
        >
          {title}
          <ChevronDown
            aria-hidden="true"
            className={clsx(
              'text-muted absolute right-4 size-4 transition-transform duration-300',
              open && 'rotate-180',
            )}
          />
        </button>
      </h3>

      <div
        id={panelId}
        inert={!open}
        className={clsx(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-3">{children}</div>
        </div>
      </div>
    </section>
  );
}
