import { useId } from 'react';
import PickerPopover from '@/components/ui/PickerPopover';
import { ASPECT_RATIOS, getAspectRatio } from '@/data/aspectRatios';
import { useCommitOnPick } from '@/hooks/useCommitOnPick';
import RatioIcon from './RatioIcon';

function RatioOptions({ value, onChange, onCommit }) {
  const name = useId();
  const pick = useCommitOnPick(onCommit);

  return (
    <div role="radiogroup" aria-label="Aspect ratio" className="grid grid-cols-4 gap-1.5">
      {ASPECT_RATIOS.map((ratio) => (
        <label key={ratio.id} className="relative" {...pick.labelProps}>
          <input
            type="radio"
            name={name}
            value={ratio.id}
            checked={ratio.id === value}
            onChange={() => onChange(ratio.id)}
            className="peer sr-only"
            {...pick.inputProps}
          />
          <span className="text-muted peer-checked:border-accent-strong peer-checked:bg-selected peer-checked:text-accent-strong peer-focus-visible:outline-ring hover:bg-panel grid cursor-pointer justify-items-center gap-2 rounded-xl border border-transparent px-1 py-2.5 transition-colors duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1">
            <span className="grid size-6 place-items-center">
              <RatioIcon ratio={ratio} size={22} />
            </span>
            <span className="text-ink text-[11px] font-medium">{ratio.label}</span>
          </span>
        </label>
      ))}
    </div>
  );
}

export default function RatioPicker({ value, onChange }) {
  const current = getAspectRatio(value);

  return (
    <PickerPopover
      label={`Aspect ratio: ${current.label}`}
      trigger={
        <>
          <RatioIcon ratio={current} size={13} />
          <span>{current.label}</span>
        </>
      }
      contentClassName="w-[18rem]"
    >
      {(close) => <RatioOptions value={value} onChange={onChange} onCommit={close} />}
    </PickerPopover>
  );
}
