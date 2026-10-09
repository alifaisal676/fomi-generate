'use client';

import { memo, useRef, useState } from 'react';
import clsx from 'clsx';
import { Copy, Download, Expand, Heart, Play, VideoOff } from 'lucide-react';
import MediaImage from '@/components/ui/MediaImage';
import { useToast } from '@/components/ui/Toast';

const TOOL =
  'pointer-events-auto grid size-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-[background-color,transform] duration-150 hover:bg-black/70 active:scale-90';

function MediaTile({ item, index, total, batch, aspect, onOpen, className, preload = false }) {
  const toast = useToast();
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const isVideo = item.type === 'video';
  const kind = isVideo ? 'Video' : 'Image';
  const summary = batch.prompt.length > 90 ? `${batch.prompt.slice(0, 90)}...` : batch.prompt;
  const label = `${kind} ${index + 1} of ${total}: ${summary}`;

  const playVideo = () => videoRef.current?.play().catch(() => {});
  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(batch.prompt);
      toast.show('Prompt copied');
    } catch {
      toast.show('Could not copy the prompt');
    }
  };

  return (
    <div
      className={clsx('group skeleton relative overflow-hidden rounded-[14px]', className)}
      style={{ aspectRatio: aspect }}
      onPointerEnter={isVideo ? playVideo : undefined}
      onPointerLeave={isVideo ? stopVideo : undefined}
    >
      {/* Videos show their poster; the clip fades in only while it plays */}
      <MediaImage
        src={isVideo ? item.poster : item.src}
        alt={label}
        sizes="(min-width: 1024px) 200px, 45vw"
        preload={preload}
        className="transition-transform duration-500 group-hover:scale-[1.03]"
      />
      {isVideo && !videoFailed && (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setVideoFailed(true)}
          className={clsx(
            'absolute inset-0 size-full object-cover transition-opacity duration-200',
            isPlaying ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
      {isVideo && videoFailed && (
        <div
          aria-hidden="true"
          className="from-panel to-panel-strong text-accent-strong/60 absolute inset-0 grid place-items-center bg-linear-to-br"
        >
          <VideoOff className="size-5" />
        </div>
      )}
      {isVideo && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-2 z-10 grid size-7 place-items-center rounded-full bg-black/50 text-white"
        >
          <Play className="size-3.5" fill="currentColor" />
        </span>
      )}

      <button
        type="button"
        onClick={() => onOpen(batch.id, index)}
        aria-label={`View ${kind.toLowerCase()} ${index + 1} larger`}
        className="absolute inset-0 z-10 cursor-zoom-in rounded-[inherit] focus-visible:-outline-offset-4"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-end gap-1.5 bg-linear-to-b from-black/35 to-transparent p-2 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100">
        <button
          type="button"
          aria-pressed={liked}
          aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => setLiked((value) => !value)}
          className={TOOL}
        >
          <Heart
            aria-hidden="true"
            className="size-4"
            fill={liked ? 'currentColor' : 'none'}
            color={liked ? '#ff8a7a' : 'currentColor'}
          />
        </button>
        <button type="button" aria-label="Copy prompt" onClick={copyPrompt} className={TOOL}>
          <Copy aria-hidden="true" className="size-4" />
        </button>
        <a href={item.src} download aria-label={`Download ${kind.toLowerCase()}`} className={TOOL}>
          <Download aria-hidden="true" className="size-4" />
        </a>
        <button
          type="button"
          aria-label={`View ${kind.toLowerCase()} larger`}
          onClick={() => onOpen(batch.id, index)}
          className={TOOL}
        >
          <Expand aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  );
}

export default memo(MediaTile);
