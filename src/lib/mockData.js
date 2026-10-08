// Static history used until the mock API lands in Stage 3.
// Thumbnails live in /public/mock/history/h-01.webp ... h-14.webp (square, ~256px).
// Missing files fall back to a neutral tile (see MediaImage).
const prompts = [
  'Warm portrait of a woman reading by a lamp in an old library',
  'Misty mountain peak at dawn above a calm lake',
  'Moss-covered forest path with soft green light',
  'An elderly couple laughing over coffee in a bright cafe',
  'Glowing translucent figure made of violet light',
  'Blue-lit close-up portrait with dewy skin',
  'Fashion portrait with a perfume bottle in studio light',
  'Woman crowned with pastel flowers, soft studio backdrop',
  'Eiffel Tower under a pastel pink sky',
  'Silhouette watching the sunset from a rooftop',
  'Night city street with warm window lights',
  'Orange cat holding a small sign that says Hello World',
  'Neon green room with soft fog and reflections',
  'Pale dreamlike portrait fading into white',
];

export const HISTORY_ITEMS = prompts.map((prompt, i) => {
  const n = String(i + 1).padStart(2, '0');
  return { id: `h-${n}`, prompt, thumb: `/mock/history/h-${n}.webp` };
});
