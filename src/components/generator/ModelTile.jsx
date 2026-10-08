import clsx from 'clsx';

/** Gradient icon tile. `compact` drops the initials for small inline use. */
export default function ModelTile({ model, compact = false, className }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'grid shrink-0 place-items-center bg-linear-to-br font-bold text-white',
        model.tone,
        className,
      )}
    >
      {compact ? null : model.initials}
    </span>
  );
}
