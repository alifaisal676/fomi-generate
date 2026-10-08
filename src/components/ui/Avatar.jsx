import clsx from 'clsx';
import MediaImage from './MediaImage';

export default function Avatar({ src, name, className = 'size-8' }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={clsx(
        'bg-chip ring-line relative block overflow-hidden rounded-full ring-1',
        className,
      )}
    >
      <MediaImage
        src={src}
        alt=""
        sizes="32px"
        fallback={
          <span
            aria-hidden="true"
            className="text-ink absolute inset-0 grid place-items-center text-[11px] font-semibold"
          >
            {initials}
          </span>
        }
      />
    </span>
  );
}
