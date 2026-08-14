import { motion } from 'framer-motion';

interface Props {
  onClick: () => void;
}

export default function FloatingEmergencyButton({ onClick }: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed z-40 w-14 h-14 rounded-full flex items-center justify-center text-2xl emergency-pulse"
      style={{
        bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
        right: '16px',
        background: 'linear-gradient(135deg, #FF1744, #D50000)',
        boxShadow: '0 4px 20px rgba(255,23,68,0.4)',
      }}
    >
      🚨
    </motion.button>
  );
}
