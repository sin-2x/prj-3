import { useEffect } from 'react';

export function useMouseGlow() {
  useEffect(() => {
    const update = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      document.documentElement.style.setProperty('--cursor-x', `${x}px`);
      document.documentElement.style.setProperty('--cursor-y', `${y}px`);
      document.documentElement.style.setProperty('--parallax-x', `${(x / window.innerWidth - 0.5) * 2}`);
      document.documentElement.style.setProperty('--parallax-y', `${(y / window.innerHeight - 0.5) * 2}`);
    };

    window.addEventListener('pointermove', update, { passive: true });
    return () => window.removeEventListener('pointermove', update);
  }, []);
}
