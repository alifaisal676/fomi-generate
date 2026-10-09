import {
  Aperture,
  Briefcase,
  Camera,
  Clapperboard,
  Drama,
  Focus,
  Hourglass,
  LayoutGrid,
  Megaphone,
  Mic,
  Move,
  Orbit,
  Palette,
  Pencil,
  Presentation,
  ScanEye,
  Scaling,
  Scissors,
  Smartphone,
  Sparkles,
  UserRound,
  WandSparkles,
} from 'lucide-react';

// Tool menus shown from the nav (items follow the product screenshots).
// Each card shows a gradient tile + icon so the menu looks finished without photo assets.
const TONES = [
  'from-orange-300 to-rose-400',
  'from-fuchsia-400 to-purple-500',
  'from-sky-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-amber-300 to-orange-500',
  'from-pink-400 to-rose-500',
];

const withTones = (items) =>
  items.map((item, index) => ({ ...item, tone: TONES[index % TONES.length] }));

export const NAV_MENUS = {
  image: {
    label: 'Image',
    items: withTones([
      { id: 'edit', label: 'Edit', icon: Pencil },
      { id: 'image-generation', label: 'Image Generation', icon: Sparkles, current: true },
      { id: 'consistent-characters', label: 'Consistent Characters', icon: UserRound },
      { id: 'enhance', label: 'Enhance', icon: WandSparkles },
    ]),
  },
  video: {
    label: 'Video',
    items: withTones([
      { id: 'video-studio', label: 'Video Studio', icon: Clapperboard },
      { id: 'marketing-studio', label: 'Marketing Studio', icon: Megaphone },
      { id: 'shorts-studio', label: 'Shorts Studio', icon: Smartphone },
      { id: 'explainer-studio', label: 'Explainer Studio', icon: Presentation },
      { id: 'video-editor', label: 'Video Editor', icon: Scissors },
      { id: 'upscale', label: 'Upscale', icon: Scaling },
      { id: 'lipsync', label: 'Lipsync', icon: Mic },
      { id: 'motion-transfer', label: 'Motion Transfer', icon: Move },
    ]),
  },
  templates: {
    label: 'Templates',
    items: [
      ...withTones([
        { id: 'alternate-realities', label: 'Alternate Realities', icon: Orbit },
        { id: 'apps', label: 'Apps', icon: LayoutGrid },
        { id: 'careers', label: 'Careers', icon: Briefcase },
        { id: 'character-consistency', label: 'Character Consistency', icon: UserRound },
        { id: 'cinema-aperture', label: 'Cinema Aperture', icon: Aperture },
        { id: 'cinema-camera', label: 'Cinema Camera', icon: Camera },
        { id: 'cinema-camera-angle', label: 'Cinema Camera Angle', icon: Focus },
        { id: 'cinema-color-tone', label: 'Cinema Color Tone', icon: Palette },
        { id: 'cinema-era', label: 'Cinema Era', icon: Hourglass },
        { id: 'cinema-focal', label: 'Cinema Focal', icon: ScanEye },
        { id: 'cinema-genre', label: 'Cinema Genre', icon: Drama },
      ]),
      { id: 'show-all', label: 'Show All' }, // text-only card, as in the design
    ],
  },
};
