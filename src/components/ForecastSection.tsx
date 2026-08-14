import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ForecastDay } from '@/hooks/useForecast';
import { getSeverity } from '@/utils/heatLogic';

interface Props {
  forecast: ForecastDay[];
  loading: boolean;
}

function ForecastCard({ day, index }: { day: ForecastDay; index: number }) {
  const severity = getSeverity(day.maxFeels);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
      className="glass-card flex-shrink-0 flex flex-col items-center justify-between"
      style={{
        width: '110px',
        height: '160px',
        padding: '14px 10px',
        borderRadius: '20px',
        scrollSnapAlign: 'start',
      }}
    >
      <p className="font-bangla font-bold text-sm leading-tight text-center">{day.dayName}</p>
      <span className="text-[32px] leading-none">{day.icon}</span>
      <div className="text-center">
        <p className="font-sora font-bold text-[22px] leading-none" style={{ color: severity.color }}>
          {day.maxFeels}°
        </p>
        <p className="font-sora text-xs" style={{ color: 'rgba(250,250,250,0.4)' }}>
          {day.minFeels}°
        </p>
      </div>
      <p className="text-[11px]" style={{ color: 'rgba(250,250,250,0.5)' }}>💧 {day.humidity}%</p>
      <span
        className="font-bangla text-[9px] px-2 py-0.5 rounded-full"
        style={{ background: `${severity.color}22`, color: severity.color }}
      >
        {severity.label}
      </span>
    </motion.div>
  );
}

function ForecastAlert({ forecast, onDismiss }: { forecast: ForecastDay[]; onDismiss: (key: string) => void }) {
  const alerts: { key: string; emoji: string; text: string; borderColor: string }[] = [];

  forecast.forEach(day => {
    if (day.maxFeels >= 40) {
      alerts.push({
        key: `heat-${day.dayName}`,
        emoji: '🚨',
        text: `আগামী ${day.dayName} তীব্র গরমের সতর্কতা! সর্বোচ্চ ${day.maxFeels}°C অনুভূত হতে পারে। পানি ও ORS স্যালাইন মজুত রাখুন।`,
        borderColor: 'rgba(255,23,68,0.3)',
      });
    }
    const isRain = day.conditionId >= 200 && day.conditionId <= 531;
    if (isRain) {
      alerts.push({
        key: `rain-${day.dayName}`,
        emoji: '🌧️',
        text: `আগামী ${day.dayName} বৃষ্টির সম্ভাবনা আছে। ছাতা ও রেইনকোট প্রস্তুত রাখুন।`,
        borderColor: 'rgba(41,182,246,0.3)',
      });
    }
    if (day.minFeels < 20) {
      alerts.push({
        key: `cold-${day.dayName}`,
        emoji: '🧥',
        text: `তাপমাত্রা কমছে। গরম কাপড় প্রস্তুত রাখুন।`,
        borderColor: 'rgba(150,200,255,0.3)',
      });
    }
  });

  // Deduplicate by type
  const seen = new Set<string>();
  const unique = alerts.filter(a => {
    const type = a.key.split('-')[0];
    if (seen.has(type)) return false;
    seen.add(type);
    return true;
  });

  if (unique.length === 0) return null;

  return (
    <AnimatePresence>
      {unique.map(alert => (
        <motion.div
          key={alert.key}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-4 relative"
          style={{ border: `1px solid ${alert.borderColor}` }}
        >
          <button
            onClick={() => onDismiss(alert.key)}
            className="absolute top-2 right-3 text-sm min-w-[32px] min-h-[32px] flex items-center justify-center"
            style={{ color: 'rgba(250,250,250,0.3)' }}
          >
            ✕
          </button>
          <p className="font-bangla text-sm pr-6">
            {alert.emoji} {alert.text}
          </p>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export default function ForecastSection({ forecast, loading }: Props) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  if (loading) {
    return (
      <div className="glass-card p-5 animate-pulse">
        <div className="h-4 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.06)', width: '60%' }} />
        <div className="flex gap-2.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-[20px]" style={{ width: 110, height: 160, background: 'rgba(255,255,255,0.04)' }} />
          ))}
        </div>
      </div>
    );
  }

  if (forecast.length === 0) return null;

  const overallMax = Math.max(...forecast.map(d => d.maxFeels));
  const overallMin = Math.min(...forecast.map(d => d.minFeels));
  const rainDays = forecast.filter(d => d.conditionId >= 200 && d.conditionId <= 531).length;

  const visibleAlerts = forecast.length > 0
    ? forecast
    : [];

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-5"
      >
        <h2 className="font-bangla font-bold text-base mb-4">📅 আগামী ৩ দিনের পূর্বাভাস</h2>

        <div
          className="flex gap-2.5 pb-2"
          style={{
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
          }}
        >
          {forecast.map((day, i) => (
            <ForecastCard key={day.dayName} day={day} index={i} />
          ))}
        </div>

        <p
          className="font-bangla text-[13px] text-center mt-3"
          style={{ color: 'rgba(250,250,250,0.4)' }}
        >
          সামনের ৩ দিন: সর্বোচ্চ {overallMax}° | সর্বনিম্ন {overallMin}° |{' '}
          {rainDays > 0 ? `${rainDays} দিন বৃষ্টির সম্ভাবনা` : 'বৃষ্টির সম্ভাবনা নেই'}
        </p>
      </motion.div>

      <ForecastAlert
        forecast={visibleAlerts.filter(d => !dismissed.has(`heat-${d.dayName}`) && !dismissed.has(`rain-${d.dayName}`) && !dismissed.has(`cold-${d.dayName}`))}
        onDismiss={key => setDismissed(prev => new Set(prev).add(key))}
      />
    </div>
  );
}
