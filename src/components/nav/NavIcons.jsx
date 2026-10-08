import { Folder, House, Video, WandSparkles } from 'lucide-react';

// The mockup uses solid glyphs for most nav icons; lucide is outline-only,
// so we fill the closed shapes and keep the wand as a line icon (as in the mockup).
const solid = { fill: 'currentColor', strokeWidth: 1.5, 'aria-hidden': true };

export const HomeIcon = (props) => <House {...solid} {...props} />;
export const VideoIcon = (props) => <Video {...solid} {...props} />;
export const FolderIcon = (props) => <Folder {...solid} {...props} />;
export const WandIcon = (props) => <WandSparkles aria-hidden="true" {...props} />;

// Solid "picture" glyph with the sun and mountains cut out.
export const ImageIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 3.5h16A2.5 2.5 0 0 1 22.5 6v12a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 18V6A2.5 2.5 0 0 1 4 3.5Zm4.25 3.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM3.5 17.25l4.75-5.25 3.25 3.25 3.5-4.5 6 6.5V18H3.5v-.75Z"
    />
  </svg>
);
