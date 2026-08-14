import { motion } from 'framer-motion';
import { getSeverity } from '@/utils/heatLogic';

interface Props {
  feelsLike: number;
}

export default function AlertBanner({ feelsLike }: Props) {
  const severity = getSeverity(feelsLike);
  if (severity.level !== 'danger' && severity.level !== 'extreme') return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="danger-shake glass-card p-4"
      style={{ border: `1px solid ${severity.color}40` }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{severity.level === 'extreme' ? '🚨' : '🔥'}</span>
        <div>
          <p className="font-bangla font-bold text-sm" style={{ color: severity.color }}>{severity.label}</p>
          <p className="font-bangla text-xs" style={{ color: 'rgba(250,250,250,0.6)' }}>{severity.message}</p>
        </div>
      </div>
    </motion.div>
  );
}
