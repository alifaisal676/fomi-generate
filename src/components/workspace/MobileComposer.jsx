'use client';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { Sparkles, X } from 'lucide-react';

/**
 * Phones: a floating prompt bar above the tab bar that opens the full generator
 * as a bottom sheet. Reuses <GeneratorPanel/> passed as children.
 */
export default function MobileComposer({ prompt, open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        aria-label="Open creator: write a prompt and choose settings"
        className="border-line bg-surface shadow-float fixed inset-x-3 bottom-[calc(3.5rem+env(safe-area-inset-bottom)+0.5rem)] z-30 flex items-center gap-3 rounded-full border p-1.5 pl-4 text-left transition-transform duration-150 active:scale-[0.99] md:hidden"
      >
        <span
          className={clsx('min-w-0 flex-1 truncate text-sm', prompt ? 'text-ink' : 'text-muted')}
        >
          {prompt || 'Describe your imagination ...'}
        </span>
        <span
          aria-hidden="true"
          className="bg-accent text-on-accent grid size-10 shrink-0 place-items-center rounded-full"
        >
          <Sparkles className="size-4" />
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/40 md:hidden" />
        <Dialog.Content
          aria-describedby={undefined}
          className="animate-sheet-in bg-panel fixed inset-x-0 bottom-0 z-[71] max-h-[90dvh] overflow-y-auto rounded-t-[28px] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] outline-none md:hidden"
        >
          <div className="mb-3 flex items-center justify-between">
            <Dialog.Title className="text-sm font-semibold">Create</Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="bg-surface text-muted hover:text-ink grid size-8 place-items-center rounded-full transition-transform duration-150 active:scale-90"
            >
              <X aria-hidden="true" className="size-4" />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
