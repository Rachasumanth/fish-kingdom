import './index.css';

import { requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './game/App';

export const Splash = () => {
  return (
    <div className="relative w-full h-full">
      <App showHud={false} />
      <button
        type="button"
        aria-label="Play Fish Kingdom"
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        className="absolute inset-0 z-40 w-full h-full cursor-pointer bg-transparent"
      />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
