import { useMemo, useRef } from 'react';

/**
 * For radio groups inside popovers: close/commit after a pointer pick or Enter,
 * but NOT while arrow keys are still moving the selection.
 * (Label clicks reach the radio as a synthetic click, so we track the pointer ourselves.)
 * Spread `labelProps` on each <label> and `inputProps` on each <input>.
 */
export function useCommitOnPick(onCommit) {
  const viaPointer = useRef(false);

  return useMemo(
    () => ({
      labelProps: {
        onPointerDown: () => {
          viaPointer.current = true;
        },
      },
      inputProps: {
        onClick: () => {
          if (!viaPointer.current) return;
          viaPointer.current = false;
          onCommit?.();
        },
        onKeyDown: (event) => {
          viaPointer.current = false;
          if (event.key === 'Enter') onCommit?.();
        },
      },
    }),
    [onCommit],
  );
}
