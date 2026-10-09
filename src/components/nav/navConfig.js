import { FolderIcon, HomeIcon, ImageIcon, VideoIcon, WandIcon } from './NavIcons';

// Order and icons follow the mockup. `menu` links an icon to a tool menu (see navMenus.js).
// Only "image" is a real page in this build.
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'image', label: 'Image', icon: ImageIcon, menu: 'image' },
  { id: 'video', label: 'Video', icon: VideoIcon, menu: 'video' },
  { id: 'templates', label: 'Templates', icon: WandIcon, menu: 'templates' },
  { id: 'library', label: 'Library', icon: FolderIcon },
];
