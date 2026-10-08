import { memo } from 'react';
import clsx from 'clsx';
import MediaImage from '@/components/ui/MediaImage';

function HistoryThumb({ item, isActive, onSelect }) {
  return (
    <li className="shrink-0 snap-start">
      <button
        type="button"
        onClick={() => onSelect(item.id)}
        aria-label={`Open generation: ${item.prompt}`}
        aria-current={isActive ? 'true' : undefined}
        className={clsx(
          'skeleton relative block size-14 overflow-hidden rounded-xl md:size-[72px]',
          'transition-[transform,box-shadow] duration-200 hover:scale-105 active:scale-95',
          isActive && 'ring-accent-strong ring-offset-surface ring-2 ring-offset-2',
        )}
      >
        <MediaImage src={item.thumb} alt="" sizes="72px" />
      </button>
    </li>
  );
}

export default memo(HistoryThumb);
