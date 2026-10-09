import clsx from 'clsx';

const IDLE_PERCENT = 18; // resting segment, as drawn in the mockup

/**
 * Thin progress track above the nav.
 * progress = null  -> decorative idle segment (hidden from assistive tech)
 * progress = 0..1  -> real generation progress, exposed as a progressbar
 */
export default function ProgressBar({ progress = null, className }) {
  const isActive = typeof progress === 'number';
  const percent = isActive ? Math.round(progress * 100) : IDLE_PERCENT;

  const a11yProps = isActive
    ? {
        role: 'progressbar',
        'aria-label': 'Generation progress',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': percent,
      }
    : { 'aria-hidden': true };

  return (
    <div
      className={clsx('bg-panel overflow-hidden', !isActive && 'max-md:invisible', className)}
      {...a11yProps}
    >
      <div
        className="bg-accent-strong h-full rounded-[inherit] transition-[width] duration-500 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
