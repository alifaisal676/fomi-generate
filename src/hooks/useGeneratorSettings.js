import { useCallback, useState } from 'react';
import { DEFAULT_RATIO_BY_MODE, DEFAULT_SETTINGS } from '@/data/generatorDefaults';
import { DEFAULT_MODEL_BY_MODE } from '@/data/models';

/** All generator form state in one place so the feed can reuse a past batch's settings. */
export function useGeneratorSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const update = useCallback((patch) => setSettings((current) => ({ ...current, ...patch })), []);

  // Switching mode swaps to that mode's default model (image models can't render video)
  // and, if the user is still on the old mode's default ratio, to the new mode's default ratio.
  const setMode = useCallback(
    (mode) =>
      setSettings((current) => {
        if (current.mode === mode) return current;
        return {
          ...current,
          mode,
          model: DEFAULT_MODEL_BY_MODE[mode],
          ratio:
            current.ratio === DEFAULT_RATIO_BY_MODE[current.mode]
              ? DEFAULT_RATIO_BY_MODE[mode]
              : current.ratio,
        };
      }),
    [],
  );

  return { settings, update, setMode };
}