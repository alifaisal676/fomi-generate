import { Sparkles } from 'lucide-react';

const EXAMPLES = [
  'A cozy reading nook with warm lamp light, soft film grain',
  'Misty mountain lake at sunrise, cinematic wide shot',
  'Portrait of an astronaut in a field of wildflowers, golden hour',
];

export default function EmptyState({ onPickPrompt }) {
  return (
    <div className="animate-fade-up bg-panel mx-auto flex max-w-md flex-col items-center gap-4 rounded-[24px] px-6 py-10 text-center">
      <span className="bg-chip text-ink grid size-12 place-items-center rounded-full">
        <Sparkles aria-hidden="true" className="size-5" />
      </span>
      <div>
        <h2 className="text-base font-semibold">Your canvas is empty</h2>
        <p className="text-muted mt-1 text-sm">
          Describe an idea in the panel to create your first images, or start from one of these.
        </p>
      </div>
      <ul className="flex w-full flex-col gap-2">
        {EXAMPLES.map((prompt) => (
          <li key={prompt}>
            <button
              type="button"
              onClick={() => onPickPrompt(prompt)}
              className="bg-surface text-ink hover:bg-selected w-full rounded-xl px-3 py-2 text-left text-xs transition-[background-color,transform] duration-150 active:scale-[0.99]"
            >
              {prompt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
