import { motion } from 'framer-motion';

interface Props {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const tabs = [
  { icon: '🌡️', label: 'আবহাওয়া' },
  { icon: '💧', label: 'পানি ট্র্যাকার' },
  { icon: '🚨', label: 'জরুরি সেবা' },
];

export default function BottomNav({ activeTab, onTabChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(6,6,8,0.9)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}>
      <div className="max-w-[420px] mx-auto flex relative">
        {/* Active indicator */}
        <motion.div
          className="absolute top-0 h-[2px]"
          style={{
            width: `${100 / 3}%`,
            background: 'linear-gradient(90deg, #FF6B00, #FFB300, #FF2D00)',
          }}
          animate={{ left: `${(activeTab * 100) / 3}%` }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
        {tabs.map((tab, i) => (
          <button key={i}
            onClick={() => onTabChange(i)}
            className="flex-1 flex flex-col items-center py-2.5 min-h-[48px] transition-opacity duration-200"
            style={{ opacity: activeTab === i ? 1 : 0.4 }}>
            <span className="text-lg">{tab.icon}</span>
            <span className="font-bangla text-[10px] mt-0.5">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
