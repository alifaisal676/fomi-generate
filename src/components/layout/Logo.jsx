import Link from 'next/link';

// Placeholder "F" mark. Swap the <path> for the official logo asset when available.
export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="Fomi home"
      className="text-ink grid size-10 place-items-center rounded-xl transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className="size-7">
        <path d="M7 4h19v6.5H14V14h9v6.2h-9V28H7V4Z" />
      </svg>
    </Link>
  );
}
