import { useId } from 'react';
import clsx from 'clsx';
import { useCommitOnPick } from '@/hooks/useCommitOnPick';

/**
 * Pill-shaped single choice built on native radio inputs, so arrow keys,
 * Tab behaviour and screen-reader semantics come for free.
 * onCommit fires on a pointer pick or Enter (not on arrow keys), so popovers can close on pick.
 */
export default function SegmentedControl({ label, options, value, onChange, onCommit, className }) {
  const name = useId();
  const pick = useCommitOnPick(onCommit);

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={clsx('bg-surface ring-line flex rounded-full p-1 ring-1', className)}
    >
      {options.map((option) => (
        <label key={option.value} className="relative flex-1" {...pick.labelProps}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={String(option.value) === String(value)}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
            {...pick.inputProps}
          />
          <span className="text-muted peer-checked:bg-chip peer-checked:text-ink peer-focus-visible:outline-ring hover:text-ink grid h-full cursor-pointer place-items-center rounded-full px-3 py-1.5 text-xs font-medium transition-[background-color,color] duration-200 select-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
