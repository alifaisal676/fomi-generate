import clsx from 'clsx';

/** Outline rectangle drawn to the ratio's real proportions, fitted inside a `size` square. */
export default function RatioIcon({ ratio, size = 18, className }) {
  const fit = ratio.value >= 1 ? [size, size / ratio.value] : [size * ratio.value, size];

  return (
    <span
      aria-hidden="true"
      className={clsx(
        'inline-block shrink-0 rounded-[3px] border-[1.5px] border-current',
        className,
      )}
      style={{ width: Math.round(fit[0]), height: Math.round(fit[1]) }}
    />
  );
}
