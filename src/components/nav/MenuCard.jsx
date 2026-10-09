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
        'group bg-surface flex h-28 w-full gap-3 rounded-2xl border p-2.5 text-left md:h-32',
        'hover:shadow-float transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0',
        item.current ? 'border-accent-strong' : 'border-line',
        hasTile ? 'items-stretch justify-between' : 'items-center justify-center',
      )}
    >
      <span
        className={clsx(
          'text-ink text-sm font-medium',
          hasTile ? 'self-end px-1 pb-1' : 'text-center',
        )}
      >
        {item.label}
      </span>
      {hasTile && (
        <span
          aria-hidden="true"
          className={clsx(
            'grid aspect-[7/6] h-full shrink-0 place-items-center rounded-xl bg-linear-to-br text-white',
            item.tone,
          )}
        >
          <Icon className="size-7 transition-transform duration-300 group-hover:scale-110" />
        </span>
      )}
    </button>
  );
}
