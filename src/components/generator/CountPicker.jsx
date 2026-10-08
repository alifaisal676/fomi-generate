import PickerPopover from '@/components/ui/PickerPopover';
import SegmentedControl from '@/components/ui/SegmentedControl';

const OPTIONS = [1, 2, 3, 4].map((n) => ({ value: n, label: String(n) }));

export default function CountPicker({ value, onChange }) {
  return (
    <PickerPopover label={`Number of images: ${value}`} trigger={<span># {value}</span>}>
      {(close) => (
        <SegmentedControl
          label="Number of images"
          options={OPTIONS}
          value={value}
          onChange={onChange}
          onCommit={close}
          className="w-44"
        />
      )}
    </PickerPopover>
  );
}
