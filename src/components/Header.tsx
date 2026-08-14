import { useEffect, useState } from 'react';

interface Props {
  lastUpdated: number | null;
  onRefresh?: () => void;
}

const getUpdateText = (lastUpdated: number | null) => {
  if (!lastUpdated) return 'আপডেট হচ্ছে...';
  const mins = Math.floor((Date.now() - lastUpdated) / 60000);
  if (mins === 0) return 'এইমাত্র আপডেট ✓';
  if (mins === 1) return '১ মিনিট আগে';
  return `${mins} মিনিট আগে`;
};

export default function Header({ lastUpdated, onRefresh }: Props) {
  const [updateText, setUpdateText] = useState(getUpdateText(lastUpdated));
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setUpdateText(getUpdateText(lastUpdated));
    const interval = setInterval(() => setUpdateText(getUpdateText(lastUpdated)), 30000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const handleRefresh = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 600);
    try { localStorage.removeItem('heatbd-cache'); } catch { /* ignore */ }
    onRefresh?.();
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between"
      style={{ background: 'rgba(6,6,8,0.85)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
      <div>
        <h1 className="logo-fire font-sora text-2xl font-extrabold leading-tight">HeatBD</h1>
        <p className="text-[11px] font-bangla" style={{ color: 'rgba(250,250,250,0.4)' }}>গরম থেকে বাঁচুন, সুস্থ থাকুন</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-safe live-pulse" />
          <span className="text-[11px] font-bangla text-safe">লাইভ</span>
        </div>
        {updateText && (
          <span className="text-[10px] font-bangla" style={{ color: 'rgba(250,250,250,0.3)' }}>
            {updateText}
          </span>
        )}
        {onRefresh && (
          <button
            onClick={handleRefresh}
            aria-label="Refresh"
            className="flex items-center justify-center"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              transition: 'transform 0.6s ease',
              transform: spinning ? 'rotate(360deg)' : 'rotate(0deg)',
            }}
          >
            <span style={{ fontSize: 16 }}>🔄</span>
          </button>
        )}
      </div>
    </header>
  );
}
