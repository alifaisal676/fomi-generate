import clsx from 'clsx';

export default function NavIconButton({
  item,
  isActive,
  isOpen,
  panelId,
  onClick,
  onPointerEnter,
}) {
  const { label, icon: Icon } = item;

  return (
    <button
      type="button"
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      aria-expanded={item.menu ? isOpen : undefined}
      aria-controls={item.menu && isOpen ? panelId : undefined}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      className={clsx(
        'group text-ink relative grid h-10 w-[50px] place-items-center rounded-xl',
        'transition-[background-color,transform] duration-200 active:scale-95',
        isActive || isOpen ? 'bg-chip' : 'hover:bg-chip/60',
      )}
    >
      <Icon className="size-[18px]" />

      {/* Visual tooltip only; the accessible name comes from aria-label. Hidden while the menu is open. */}
      {!isOpen && (
        <span
          aria-hidden="true"
          className={clsx(
            'border-line bg-surface pointer-events-none absolute top-full z-50 mt-2 hidden rounded-md border px-2 py-1',
            'text-ink shadow-float text-xs font-medium whitespace-nowrap opacity-0 transition-opacity duration-150 md:block',
            'md:group-hover:opacity-100 md:group-hover:delay-300 md:group-focus-visible:opacity-100',
          )}
        >
          {label}
        </span>
      )}
    </button>
  );
}
