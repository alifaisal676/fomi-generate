'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ImageOff } from 'lucide-react';

/**
 * next/image that fills its parent (parent must be `relative` with a size)
 * and degrades to a neutral tile instead of a broken-image icon.
 * Pass alt="" for purely decorative images.
 */
export default function MediaImage({
  src,
  alt,
  sizes,
  preload = false,
  className,
  fallback = null,
  ...rest
}) {
  // Track the failed src (not a boolean) so a new src gets a fresh attempt.
  const [failedSrc, setFailedSrc] = useState(null);

  if (failedSrc === src) {
    return (
      fallback ?? (
        <div
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
          className="from-panel to-panel-strong text-accent-strong/60 absolute inset-0 grid place-items-center bg-linear-to-br"
        >
          <ImageOff aria-hidden="true" className="size-5" />
        </div>
      )
    );
  }

  return (
    <Image
      fill
      src={src}
      alt={alt}
      sizes={sizes}
      preload={preload}
      onError={() => setFailedSrc(src)}
      className={clsx('object-cover', className)}
      {...rest}
    />
  );
}
