import clsx from 'clsx';

export default function MenuCard({ item, onSelect }) {
  const Icon = item.icon;
  const hasTile = Boolean(Icon && item.tone);

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-current={item.current ? 'page' : undefined}
      className={clsx(
        'group bg-surface flex h-20 w-full min-w-0 gap-2 overflow-hidden rounded-2xl border p-2.5 text-left md:h-32 md:gap-3',
        'hover:shadow-float transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0',
        item.current ? 'border-accent-strong' : 'border-line',
        hasTile ? 'items-center justify-between md:items-stretch' : 'items-center justify-center',
      )}
    >
      <span
        className={clsx(
          'text-ink min-w-0 text-[13px] leading-snug font-medium md:text-sm',
          hasTile ? 'md:self-end md:px-1 md:pb-1' : 'text-center',
        )}
      >
        {item.label}
      </span>
      {hasTile && (
        <span
          aria-hidden="true"
          className={clsx(
            'grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linear-to-br text-white md:aspect-[7/6] md:h-full md:w-auto',
            item.tone,
          )}
        >
          <Icon className="size-5 transition-transform duration-300 group-hover:scale-110 md:size-7" />
        </span>
      )}
    </button>
  );
}
