import { Clock } from 'lucide-react';
import PickerPopover from '@/components/ui/PickerPopover';
import SegmentedControl from '@/components/ui/SegmentedControl';

const OPTIONS = [
  { value: 5, label: '5s' },
  { value: 10, label: '10s' },
];

export default function DurationPicker({ value, onChange }) {
  return (
    <PickerPopover
      label={`Video length: ${value} seconds`}
      trigger={
        <>
          <Clock aria-hidden="true" className="size-3 shrink-0" />
          <span>{value}s</span>
        </>
      }
    >
      {(close) => (
        <SegmentedControl
          label="Video length"
          options={OPTIONS}
          value={value}
          onChange={onChange}
          onCommit={close}
          className="w-36"
        />
      )}
    </PickerPopover>
  );
}
