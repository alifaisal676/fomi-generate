import { useId } from 'react';
import { Check } from 'lucide-react';
import PickerPopover from '@/components/ui/PickerPopover';
import { getModel, getModelGroups } from '@/data/models';
import { useCommitOnPick } from '@/hooks/useCommitOnPick';
import ModelTile from './ModelTile';

function ModelOptions({ mode, value, onChange, onCommit }) {
  const name = useId();
  const pick = useCommitOnPick(onCommit);

  return (
    <div className="space-y-2">
      {getModelGroups(mode).map(({ group, models }) => (
        <fieldset key={group}>
          <legend className="text-muted px-2 pb-1 text-[11px] font-medium">{group}</legend>
          {models.map((model) => (
            <label
              key={model.id}
              {...pick.labelProps}
              className="group hover:bg-panel has-checked:bg-selected has-focus-visible:outline-ring relative flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors duration-150 has-focus-visible:outline-2"
            >
              <input
                type="radio"
                name={name}
                value={model.id}
                checked={model.id === value}
                onChange={() => onChange(model.id)}
                className="sr-only"
                {...pick.inputProps}
              />
              <ModelTile model={model} className="size-9 rounded-lg text-[11px]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{model.name}</span>
                <span className="text-muted block text-[11px] capitalize">{model.kind}</span>
              </span>
              <Check
                aria-hidden="true"
                className="text-accent-strong size-4 opacity-0 group-has-checked:opacity-100"
              />
            </label>
          ))}
        </fieldset>
      ))}
    </div>
  );
}

export default function ModelPicker({ mode, value, onChange, className }) {
  const current = getModel(value);

  return (
    <PickerPopover
      label={`Model: ${current.name}`}
      className={className}
      align="end"
      contentClassName="max-h-[min(22rem,var(--radix-popover-content-available-height))] w-64 overflow-y-auto"
      trigger={
        <>
          <ModelTile model={current} compact className="size-4 rounded-[5px]" />
          <span className="min-w-0 truncate font-semibold">{current.name}</span>
        </>
      }
    >
      {(close) => <ModelOptions mode={mode} value={value} onChange={onChange} onCommit={close} />}
    </PickerPopover>
  );
}
