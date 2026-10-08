import { DEFAULT_MODEL_BY_MODE } from './models';

export const DEFAULT_SETTINGS = {
  mode: 'image', // 'image' | 'video'
  prompt: '',
  count: 4, // images per generation
  duration: 5, // seconds, video only
  ratio: '2:3', // closest listed ratio to the mockup's portrait tiles
  model: DEFAULT_MODEL_BY_MODE.image,
  negativePrompt: '',
  seed: '', // '' = random
  guidance: 7,
  style: 'auto',
};

export const MODE_OPTIONS = [
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
];
