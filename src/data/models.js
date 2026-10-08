// Mock model catalogue. Names follow the "Explore models" screens; icons are
// gradient tiles with initials (no third-party logos). Class strings are written in
// full so Tailwind can see them.
export const MODELS = [
  {
    id: 'nano-banana-2',
    name: 'Nano Banana 2',
    kind: 'image',
    group: 'Image to image',
    initials: 'NB',
    tone: 'from-fuchsia-500 to-orange-400',
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana',
    kind: 'image',
    group: 'Image to image',
    initials: 'N',
    tone: 'from-violet-500 to-pink-400',
  },
  {
    id: 'gpt-image-2',
    name: 'GPT Image 2',
    kind: 'image',
    group: 'Image to image',
    initials: 'G2',
    tone: 'from-blue-900 to-indigo-600',
  },
  {
    id: 'gpt-image-1-5',
    name: 'GPT Image 1.5',
    kind: 'image',
    group: 'Image to image',
    initials: 'G1',
    tone: 'from-purple-900 to-purple-500',
  },
  {
    id: 'ideogram-v3',
    name: 'Ideogram v3',
    kind: 'image',
    group: 'Text to image',
    initials: 'ID',
    tone: 'from-red-400 to-rose-600',
  },
  {
    id: 'imagen-4',
    name: 'Imagen 4.0',
    kind: 'image',
    group: 'Text to image',
    initials: 'IM',
    tone: 'from-orange-500 to-amber-500',
  },
  {
    id: 'gemini-omni-flash',
    name: 'Gemini Omni Flash',
    kind: 'image',
    group: 'Text to image',
    initials: 'GF',
    tone: 'from-indigo-700 to-rose-600',
  },
  {
    id: 'kling-v3-pro',
    name: 'Kling v3 Pro',
    kind: 'video',
    group: 'Video',
    initials: 'KP',
    tone: 'from-fuchsia-500 to-purple-600',
  },
  {
    id: 'kling-v3-standard',
    name: 'Kling v3 Standard',
    kind: 'video',
    group: 'Video',
    initials: 'KS',
    tone: 'from-orange-400 to-amber-500',
  },
  {
    id: 'kling-o3-pro',
    name: 'Kling o3 Pro',
    kind: 'video',
    group: 'Video',
    initials: 'OP',
    tone: 'from-sky-500 to-cyan-600',
  },
  {
    id: 'kling-o3-standard',
    name: 'Kling o3 Standard',
    kind: 'video',
    group: 'Video',
    initials: 'OS',
    tone: 'from-sky-600 to-blue-700',
  },
  {
    id: 'kling-o3-4k',
    name: 'Kling o3 4K',
    kind: 'video',
    group: 'Video',
    initials: '4K',
    tone: 'from-indigo-800 to-red-600',
  },
];

export const DEFAULT_MODEL_BY_MODE = { image: 'nano-banana-2', video: 'kling-v3-pro' };

export const getModel = (id) => MODELS.find((model) => model.id === id) ?? MODELS[0];

/** Models for a mode, grouped in display order: [{ group, models }] */
export function getModelGroups(mode) {
  const groups = [];
  for (const model of MODELS.filter((m) => m.kind === mode)) {
    let entry = groups.find((g) => g.group === model.group);
    if (!entry) {
      entry = { group: model.group, models: [] };
      groups.push(entry);
    }
    entry.models.push(model);
  }
  return groups;
}
