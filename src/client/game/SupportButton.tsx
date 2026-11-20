import { useState } from 'react';
import { Heart } from 'lucide-react';
import { OrderResultStatus, purchase, showToast } from '@devvit/web/client';

export const SupportButton = () => {
  const [busy, setBusy] = useState(false);

  const support = async () => {
    setBusy(true);
    try {
      const result = await purchase('support-app');
      if (result.status === OrderResultStatus.STATUS_SUCCESS) {
        showToast('Thanks for supporting Fish Kingdom! 🐟');
      } else {
        showToast(result.errorMessage ?? 'The purchase did not complete');
      }
    } catch (err) {
      console.error('Support purchase failed', err);
      showToast('Could not start the purchase');
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void support()}
      disabled={busy}
      className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-semibold text-white/90 shadow-lg backdrop-blur-sm transition hover:bg-black/60 disabled:opacity-60"
    >
      <Heart className="w-3.5 h-3.5 text-rose-300" />
      <span>{busy ? 'Opening…' : 'Support this app'}</span>
    </button>
  );
};
