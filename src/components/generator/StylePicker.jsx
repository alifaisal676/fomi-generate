import { useId } from 'react';
import { STYLES } from '@/data/styles';

export default function StylePicker({ value, onChange }) {
  const name = useId();

  return (
    <fieldset>
      <legend className="sr-only">Style</legend>
      <div className="grid grid-cols-2 gap-2">
        {STYLES.map((style) => (
          <label
            key={style.id}
            className="bg-surface hover:border-line has-checked:border-accent-strong has-checked:bg-selected has-focus-visible:outline-ring relative flex cursor-pointer items-center gap-2 rounded-xl border border-transparent px-2.5 py-2 text-xs font-medium transition-[border-color,background-color] duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2"
          >
            <input
              type="radio"
              name={name}
              value={style.id}
              checked={style.id === value}
              onChange={() => onChange(style.id)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`size-4 shrink-0 rounded-full bg-linear-to-br ${style.swatch}`}
            />
            <span className="truncate">{style.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
