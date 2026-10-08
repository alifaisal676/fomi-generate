'use client';

import { useCallback, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

/**
 * Pill trigger + popover. Radix handles focus management, Esc, outside click
 * and flipping near viewport edges. `children` may be a function receiving `close`.
 */
export default function PickerPopover({
  label,
  trigger,
  children,
  align = 'start',
  className,
  contentClassName,
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label={label}
        className={clsx(
          'group border-line bg-surface text-ink inline-flex h-8 min-w-0 items-center gap-1 rounded-full border px-2 text-[11px] font-medium',
          'hover:bg-selected data-[state=open]:border-accent-strong transition-[border-color,background-color,transform] duration-150 active:scale-95',
          className,
        )}
      >
        <span className="flex min-w-0 items-center gap-1.5">{trigger}</span>
        <ChevronDown
          aria-hidden="true"
          className="text-muted size-3 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align={align}
          sideOffset={8}
          collisionPadding={12}
          className={clsx(
            'border-line bg-surface shadow-float data-[state=open]:animate-popover-in z-50 rounded-2xl border p-3',
            contentClassName,
          )}
        >
          {typeof children === 'function' ? children(close) : children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
