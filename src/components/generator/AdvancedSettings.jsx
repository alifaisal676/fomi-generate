import { useId } from 'react';
import { Dices } from 'lucide-react';

const FIELD =
  'w-full rounded-xl border border-line bg-surface px-3 py-2 text-xs text-ink placeholder:text-muted focus:border-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/30';
const LABEL = 'mb-1 block text-[11px] font-medium text-muted';

export default function AdvancedSettings({ settings, onChange }) {
  const id = useId();

  return (
    <div className="space-y-3 px-1">
      <div>
        <label htmlFor={`${id}-negative`} className={LABEL}>
          Negative prompt
        </label>
        <textarea
          id={`${id}-negative`}
          rows={2}
          value={settings.negativePrompt}
          onChange={(event) => onChange({ negativePrompt: event.target.value })}
          placeholder="Things to avoid, e.g. blurry, extra fingers"
          className={`${FIELD} resize-none`}
        />
      </div>

      <div>
        <label htmlFor={`${id}-seed`} className={LABEL}>
          Seed
        </label>
        <div className="flex gap-2">
          <input
            id={`${id}-seed`}
            type="number"
            inputMode="numeric"
            min="0"
            value={settings.seed}
            onChange={(event) => onChange({ seed: event.target.value })}
            placeholder="Random"
            className={FIELD}
          />
          <button
            type="button"
            aria-label="Randomize seed"
            onClick={() => onChange({ seed: String(Math.floor(Math.random() * 1_000_000)) })}
            className="border-line bg-surface text-muted hover:text-ink grid size-9 shrink-0 place-items-center rounded-xl border transition-[color,transform] duration-150 active:scale-90"
          >
            <Dices aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-guidance`} className={`${LABEL} flex justify-between`}>
          <span>Guidance</span>
          <output htmlFor={`${id}-guidance`} className="text-ink tabular-nums">
            {settings.guidance}
          </output>
        </label>
        <input
          id={`${id}-guidance`}
          type="range"
          min="1"
          max="20"
          step="0.5"
          value={settings.guidance}
          onChange={(event) => onChange({ guidance: Number(event.target.value) })}
          className="fomi-range w-full"
          style={{ '--pct': `${((settings.guidance - 1) / 19) * 100}%` }}
        />
      </div>
    </div>
  );
}
