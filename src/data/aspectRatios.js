// Same 11 ratios, in the same order, as the production popover.
const LABELS = ['1:1', '4:3', '3:2', '16:9', '9:16', '2:3', '4:5', '5:4', '12:5', '3:1', '5:12'];

export const ASPECT_RATIOS = LABELS.map((label) => {
  const [width, height] = label.split(':').map(Number);
  return { id: label, label, width, height, value: width / height };
});

export const getAspectRatio = (id) =>
  ASPECT_RATIOS.find((ratio) => ratio.id === id) ?? ASPECT_RATIOS[0];
