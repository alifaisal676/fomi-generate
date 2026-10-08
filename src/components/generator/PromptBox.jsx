import clsx from 'clsx';
import { LoaderCircle, Sparkles } from 'lucide-react';

/**
 * Prompt textarea with the Generate button inside it (as in the mockup).
 * Must live inside a <form>: Cmd/Ctrl+Enter submits it, Enter adds a new line.
 * The button uses aria-disabled (not disabled) so an empty click can still explain itself.
 */
export default function PromptBox({
  id,
  value,
  onChange,
  placeholder,
  isGenerating,
  isNudging,
  textareaRef,
}) {
  const isEmpty = value.trim().length === 0;

  const handleKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div
      className={clsx(
        'border-ink bg-surface focus-within:ring-accent/40 relative rounded-[22px] border-2 transition-shadow duration-200 focus-within:ring-4',
        isNudging && 'animate-nudge',
      )}
    >
      <label htmlFor={id} className="sr-only">
        Prompt
      </label>
      <textarea
        id={id}
        ref={textareaRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        maxLength={1000}
        className="text-ink placeholder:text-muted block h-40 w-full resize-none rounded-[20px] bg-transparent px-4 pt-4 pb-16 text-[13px] leading-relaxed outline-none lg:h-44"
      />

      <button
        type="submit"
        aria-disabled={isEmpty || isGenerating}
        className="bg-accent text-on-accent hover:bg-accent-strong aria-disabled:hover:bg-accent absolute right-3 bottom-3 inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-[transform,background-color,opacity] duration-150 active:scale-95 aria-disabled:opacity-70 aria-disabled:active:scale-100"
      >
        {isGenerating ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            Generating
          </>
        ) : (
          <>
            <Sparkles aria-hidden="true" className="size-4" />
            Generate
          </>
        )}
      </button>
    </div>
  );
}
