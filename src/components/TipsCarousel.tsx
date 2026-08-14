import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFilteredTips } from '@/utils/heatLogic';

interface Props {
  conditionId: number;
  feelsLike: number;
}

export default memo(function TipsCarousel({ conditionId, feelsLike }: Props) {
  const tips = getFilteredTips(conditionId, feelsLike);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (tips.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  if (!tips.length) return null;
  const tip = tips[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bangla font-bold text-base">💡 স্বাস্থ্য পরামর্শ</h2>
        <span className="font-sora text-[10px]" style={{ color: 'rgba(250,250,250,0.3)' }}>
          {currentIndex + 1}/{tips.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -25 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">{tip.icon}</span>
            <div>
              <p className="font-bangla font-bold text-sm mb-1">{tip.title}</p>
              <p className="font-bangla text-xs leading-relaxed" style={{ color: 'rgba(250,250,250,0.6)' }}>
                {tip.detail}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-1 mt-4">
        {tips.slice(0, Math.min(tips.length, 10)).map((_, i) => (
          <div key={i} className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === currentIndex % Math.min(tips.length, 10) ? '16px' : '4px',
              background: i === currentIndex % Math.min(tips.length, 10) ? '#FF6B00' : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
});
