import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Props {
  glasses: boolean[];
  toggleGlass: (i: number) => void;
  count: number;
  remaining: number;
  message: string;
  showCelebration: boolean;
  setShowCelebration: (v: boolean) => void;
  streak: number;
  timeline: string[];
  mlConsumed: number;
  mlTarget: number;
}

function WaterGlass({ filled, onClick, index }: { filled: boolean; onClick: () => void; index: number }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1 min-w-[48px] min-h-[48px] p-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <svg viewBox="0 0 42 58" width="42" height="58">
        <defs>
          <linearGradient id={`waterGrad${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#29B6F6" />
            <stop offset="100%" stopColor="#0288D1" />
          </linearGradient>
          <clipPath id={`glassClip${index}`}>
            <path d="M6 4 L36 4 L31 54 L11 54 Z" />
          </clipPath>
        </defs>
        <path d="M6 4 L36 4 L31 54 L11 54 Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <rect
          x="0" y="0" width="42" height="58"
          fill={`url(#waterGrad${index})`}
          clipPath={`url(#glassClip${index})`}
          style={{
            clipPath: filled ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
            transition: 'clip-path 0.65s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        />
        {filled && (
          <ellipse cx="21" cy="10" rx="12" ry="2" fill="rgba(255,255,255,0.15)"
            style={{ animation: 'livePulse 2s ease-in-out infinite' }} />
        )}
      </svg>
      <span className="font-sora text-[10px]" style={{ color: filled ? '#29B6F6' : 'rgba(250,250,250,0.2)' }}>
        {index + 1}
      </span>
    </motion.button>
  );
}

function ProgressRing({ count }: { count: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (count / 8) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle cx="36" cy="36" r={radius} fill="none"
          stroke={count === 8 ? '#00E676' : '#29B6F6'}
          strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease', transform: 'rotate(-90deg)', transformOrigin: '36px 36px' }}
        />
      </svg>
      <span className="absolute font-sora font-bold text-sm">{count}/8</span>
    </div>
  );
}

function CelebrationModal({ onClose }: { onClose: () => void }) {
  const confettiColors = ['#FF2D00', '#FFB300', '#00E676', '#29B6F6', '#FF6B00'];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="absolute" style={{
          left: `${Math.random() * 100}%`,
          width: `${6 + Math.random() * 6}px`,
          height: `${6 + Math.random() * 6}px`,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          backgroundColor: confettiColors[i % confettiColors.length],
          animation: `confettiFall ${1 + Math.random() * 2}s ${Math.random() * 0.5}s ease-out forwards`,
        }} />
      ))}
      <motion.div
        className="glass-card p-8 text-center z-10 relative"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-4">
          <circle cx="32" cy="32" r="28" fill="none" stroke="#00E676" strokeWidth="3" />
          <motion.path d="M20 32 L28 40 L44 24" fill="none" stroke="#00E676" strokeWidth="3" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
          />
        </svg>
        <p className="font-bangla font-bold text-lg mb-2">🎉 অসাধারণ!</p>
        <p className="font-bangla text-sm" style={{ color: 'rgba(250,250,250,0.6)' }}>আজকের হাইড্রেশন লক্ষ্য পূরণ!</p>
      </motion.div>
    </motion.div>
  );
}

export default function HydrationTracker({ 
  glasses, toggleGlass, count, remaining, message, 
  showCelebration, setShowCelebration, streak, timeline,
  mlConsumed, mlTarget 
}: Props) {
  const handleToggle = (i: number) => {
    const isFilling = !glasses[i];
    toggleGlass(i);
    if (isFilling) {
      const newCount = count + 1;
      toast.success(`✅ দারুণ! ${newCount}/8 গ্লাস সম্পন্ন।`, { duration: 2000 });
    }
  };

  const percentage = Math.round((mlConsumed / mlTarget) * 100);

  return (
    <>
      {/* Main Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-5"
      >
        <h2 className="font-bangla font-bold text-base mb-4">💧 হাইড্রেশন ট্র্যাকার</h2>

        <div className="flex items-center gap-4 mb-4">
          <ProgressRing count={count} />
          <div className="flex-1">
            <p className="font-bangla text-sm" style={{ color: 'rgba(250,250,250,0.6)' }}>{message}</p>
            {remaining > 0 && (
              <p className="font-bangla text-[11px] mt-1" style={{ color: 'rgba(250,250,250,0.3)' }}>
                আর {remaining} গ্লাস বাকি
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 justify-items-center">
          {glasses.map((filled, i) => (
            <WaterGlass key={i} filled={filled} onClick={() => handleToggle(i)} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="grid grid-cols-3 gap-3"
      >
        {/* ML consumed */}
        <div className="glass-card p-3 text-center">
          <p className="font-sora font-bold text-lg" style={{ color: '#29B6F6' }}>{mlConsumed}</p>
          <p className="font-bangla text-[10px]" style={{ color: 'rgba(250,250,250,0.4)' }}>মিলি. পান করেছেন</p>
        </div>
        {/* Percentage */}
        <div className="glass-card p-3 text-center">
          <p className="font-sora font-bold text-lg" style={{ color: percentage >= 100 ? '#00E676' : '#FFB300' }}>{percentage}%</p>
          <p className="font-bangla text-[10px]" style={{ color: 'rgba(250,250,250,0.4)' }}>লক্ষ্য অর্জিত</p>
        </div>
        {/* Streak */}
        <div className="glass-card p-3 text-center">
          <p className="font-sora font-bold text-lg" style={{ color: streak > 0 ? '#FF6B00' : 'rgba(250,250,250,0.3)' }}>
            {streak > 0 ? `🔥 ${streak}` : '0'}
          </p>
          <p className="font-bangla text-[10px]" style={{ color: 'rgba(250,250,250,0.4)' }}>দিনের স্ট্রিক</p>
        </div>
      </motion.div>

      {/* Water Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="glass-card p-4"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="font-bangla text-xs font-semibold" style={{ color: 'rgba(250,250,250,0.6)' }}>আজকের অগ্রগতি</span>
          <span className="font-sora text-xs" style={{ color: '#29B6F6' }}>{mlConsumed}/{mlTarget} ml</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              background: percentage >= 100
                ? 'linear-gradient(90deg, #00E676, #69F0AE)'
                : 'linear-gradient(90deg, #0288D1, #29B6F6, #4FC3F7)',
            }}
          />
        </div>
      </motion.div>

      {/* Timeline */}
      {timeline.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="glass-card p-4"
        >
          <h3 className="font-bangla text-xs font-bold mb-3" style={{ color: 'rgba(250,250,250,0.6)' }}>
            🕐 আজকের টাইমলাইন
          </h3>
          <div className="flex flex-wrap gap-2">
            {timeline.map((time, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                style={{ background: 'rgba(41,182,246,0.1)', border: '1px solid rgba(41,182,246,0.15)' }}
              >
                <span style={{ color: '#29B6F6' }}>💧</span>
                <span className="font-sora text-[10px]" style={{ color: 'rgba(250,250,250,0.5)' }}>{time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hydration Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="glass-card p-4"
      >
        <h3 className="font-bangla text-xs font-bold mb-3" style={{ color: 'rgba(250,250,250,0.6)' }}>
          💡 হাইড্রেশন টিপস
        </h3>
        <ul className="space-y-2">
          {[
            { icon: '🍉', tip: 'তরমুজ, শসা, কমলা খেলে শরীরে পানির ঘাটতি কমে' },
            { icon: '☕', tip: 'চা-কফি কম পান করুন — ক্যাফেইন পানিশূন্যতা বাড়ায়' },
            { icon: '🧂', tip: 'ঘামলে শুধু পানি নয়, ORS বা লবণ-চিনির পানি পান করুন' },
            { icon: '⏰', tip: 'প্রতি ৪৫ মিনিটে ১ গ্লাস পানি পান করার অভ্যাস করুন' },
            { icon: '🍌', tip: 'কলা ও ডাবের পানি পটাসিয়াম যোগায় — ক্র্যাম্প কমায়' },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-sm mt-0.5">{item.icon}</span>
              <span className="font-bangla text-[11px]" style={{ color: 'rgba(250,250,250,0.5)' }}>{item.tip}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <AnimatePresence>
        {showCelebration && (
          <CelebrationModal onClose={() => setShowCelebration(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
