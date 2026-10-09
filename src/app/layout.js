import { Poppins } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import MockupOverlay from '@/components/dev/MockupOverlay';
import CursorSparkles from '@/components/ui/CursorSparkles';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Fomi | Create',
  description: 'Turn ideas into images and videos with AI.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbfaf7',
};

// Runs before first paint so a saved dark theme never flashes light.
const themeInit = `try{var t=localStorage.getItem('fomi-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="bg-bg text-ink font-sans antialiased">
        <ToastProvider>{children}</ToastProvider>
        {process.env.NODE_ENV === 'development' && <MockupOverlay />}
      </body>
      <CursorSparkles />
    </html>
  );
}
