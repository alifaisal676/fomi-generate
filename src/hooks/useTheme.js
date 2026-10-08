import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'fomi-theme';
const EVENT = 'fomi-theme-change';

function subscribe(onChange) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

const getSnapshot = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
const getServerSnapshot = () => 'light';

/** Reads/writes the theme on <html data-theme>. The pre-paint script in layout.js sets the initial value. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode): theme still applies for this session */
    }
    window.dispatchEvent(new Event(EVENT));
  }, [theme]);

  return { theme, toggle };
}
