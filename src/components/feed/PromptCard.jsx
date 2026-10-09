import { LoaderCircle, TriangleAlert } from 'lucide-react';
import { getAspectRatio } from '@/data/aspectRatios';
import { getModel } from '@/data/models';

export default function PromptCard({ batch, onReuse }) {
  const { settings } = batch;
  const model = getModel(settings.model);
  const count =
    settings.mode === 'video' ? `${settings.duration}s video` : `${settings.count} images`;
  const meta = `${getAspectRatio(settings.ratio).label} · ${count}`;

  return (
    <div className="bg-panel flex flex-col rounded-[18px] p-4">
      <p className="text-ink text-[13px] leading-relaxed [overflow-wrap:anywhere]">
        {batch.prompt}
      </p>

      <div className="mt-auto flex items-end justify-between gap-2 pt-4">
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
