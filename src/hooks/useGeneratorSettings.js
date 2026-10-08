import { useCallback, useState } from 'react';
import { DEFAULT_SETTINGS } from '@/data/generatorDefaults';
import { DEFAULT_MODEL_BY_MODE } from '@/data/models';

/** All generator form state in one place so the feed can reuse a past batch's settings (Stage 3). */
export function useGeneratorSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const update = useCallback((patch) => setSettings((current) => ({ ...current, ...patch })), []);

  // Switching mode also swaps to that mode's default model (image models can't render video).
  const setMode = useCallback(
    (mode) =>
      setSettings((current) =>
        current.mode === mode ? current : { ...current, mode, model: DEFAULT_MODEL_BY_MODE[mode] },
      ),
    [],
  );

  return { settings, update, setMode };
}
