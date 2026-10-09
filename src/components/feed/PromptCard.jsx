'use client';

import { useId, useState } from 'react';
import clsx from 'clsx';
import { ChevronDown, LoaderCircle, TriangleAlert } from 'lucide-react';
import { getAspectRatio } from '@/data/aspectRatios';
import { getModel } from '@/data/models';

const LONG_PROMPT = 110; // characters; longer prompts collapse on stacked (phone/tablet) layouts

export default function PromptCard({ batch, onReuse }) {
  const [expanded, setExpanded] = useState(false);
  const textId = useId();
  const { settings } = batch;
  const model = getModel(settings.model);
  const count =
    settings.mode === 'video' ? `${settings.duration}s video` : `${settings.count} images`;
  const meta = `${getAspectRatio(settings.ratio).label} · ${count}`;
  const isLong = batch.prompt.length > LONG_PROMPT;
  const isCollapsed = isLong && !expanded;

  return (
    <div className="bg-panel flex flex-col rounded-[18px] p-3.5 lg:p-4">
      {/* Side-by-side layout (lg+) always shows the full prompt; stacked layouts clamp to 3 lines */}
      <div className="relative">
        <p
          id={textId}
          className={clsx(
            'text-ink text-[13px] leading-relaxed [overflow-wrap:anywhere] transition-[max-height] duration-300 ease-out',
            isCollapsed && 'max-lg:max-h-[4.9em] max-lg:overflow-hidden',
            isLong && expanded && 'max-lg:max-h-[40em]',
          )}
        >
          {batch.prompt}
        </p>
        {isCollapsed && (
          <span
            aria-hidden="true"
            className="from-panel pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-linear-to-t to-transparent lg:hidden"
          />
        )}
      </div>

      {isLong && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={textId}
          onClick={() => setExpanded((value) => !value)}
          className="text-ink mt-1 inline-flex items-center gap-1 self-start py-1 text-xs font-medium underline underline-offset-2 lg:hidden"
        >
          {expanded ? 'Show less' : 'Show more'}
          <ChevronDown
            aria-hidden="true"
            className={clsx('size-3 transition-transform duration-300', expanded && 'rotate-180')}
          />
        </button>
      )}

      <div className="mt-auto flex items-end justify-between gap-2 pt-3 lg:pt-4">
        <p className="text-muted flex items-center gap-1.5 text-[11px]" role="status">
          {batch.status === 'loading' && (
            <>
              <LoaderCircle aria-hidden="true" className="size-3 animate-spin" />
              Generating
            </>
          )}
          {batch.status === 'error' && (
            <>
              <TriangleAlert aria-hidden="true" className="size-3" />
              Failed
            </>
          )}
          {batch.status === 'done' && meta}
        </p>
        <button
          type="button"
          onClick={() => onReuse(batch)}
          title="Reuse these settings"
          className="bg-surface text-ink hover:bg-selected max-w-[60%] truncate rounded-xl px-3 py-1.5 text-xs font-medium shadow-[0_1px_0_var(--line)] transition-[background-color,transform] duration-150 active:scale-95"
        >
          {model.name}
        </button>
      </div>
    </div>
  );
}
