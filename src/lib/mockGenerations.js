// Mock "backend" data + builders. Used only by the API route (server side).
// Drop your files in /public/mock/results:
//   portrait-01.webp ... portrait-08.webp          (about 768x1024)
//   video-01.mp4 ... video-03.mp4 + matching video-01.webp ... video-03.webp posters
const PORTRAIT_COUNT = 8;
const VIDEOS = [1, 2, 3].map((n) => ({
  src: `/mock/results/video-0${n}.mp4`,
  poster: `/mock/results/video-0${n}.webp`,
}));

const portrait = (n) =>
  `/mock/results/portrait-${String(((n - 1) % PORTRAIT_COUNT) + 1).padStart(2, '0')}.webp`;

const imageItems = (batchId, start, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${batchId}-${i + 1}`,
    type: 'image',
    src: portrait(start + i),
  }));

const MOCKUP_PROMPT =
  'A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face. She is turned slightly towards the viewer, offering a genuine and approachable expression. She is wearing a cream-colored cashmere sweater and delicate gold earrings. The background is a softly blurred expanse of muted grey and beige tones, suggesting a modern art gallery. There is subtle directional lighting.';

const BASE_SETTINGS = {
  mode: 'image',
  prompt: MOCKUP_PROMPT,
  count: 4,
  duration: 5,
  ratio: '2:3',
  model: 'nano-banana-2',
  negativePrompt: '',
  seed: '',
  guidance: 7,
  style: 'auto',
};

// Deterministic on purpose: GET is pre-rendered, so no Date/random here.
export const SEED_BATCHES = [
  {
    id: 'seed-1',
    status: 'done',
    prompt: MOCKUP_PROMPT,
    settings: BASE_SETTINGS,
    items: imageItems('seed-1', 1, 4),
  },
  {
    id: 'seed-2',
    status: 'done',
    prompt: MOCKUP_PROMPT,
    settings: { ...BASE_SETTINGS, model: 'imagen-4' },
    items: imageItems('seed-2', 5, 4),
  },
];

const hash = (text) => [...text].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);

/** Builds a finished batch for a POSTed settings object. */
export function buildBatch(settings) {
  const prompt = settings.prompt.trim();
  const id = `api-${crypto.randomUUID()}`;
  const seed = hash(prompt);
  const count = Math.min(4, Math.max(1, Number(settings.count) || 4));

  const items =
    settings.mode === 'video'
      ? [{ id: `${id}-1`, type: 'video', ...VIDEOS[seed % VIDEOS.length] }]
      : imageItems(id, (seed % PORTRAIT_COUNT) + 1, count);

  return { id, status: 'done', prompt, settings: { ...settings, prompt }, items };
}
