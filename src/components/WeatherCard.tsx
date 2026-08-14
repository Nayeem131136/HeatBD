import { memo, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getSeverity, getWeatherConditions } from '@/utils/heatLogic';

interface Props {
  feelsLike: number;
  temp: number;
  humidity: number;
  windSpeed: number;
  cityName: string;
  conditionId: number;
  descriptionBn: string;
}

function SunIcon({ isExtreme }: { isExtreme: boolean }) {
  return (
    <svg className="sun-pulse" width="64" height="64" viewBox="0 0 64 64"
      style={isExtreme ? { filter: 'hue-rotate(20deg)' } : {}}>
      <circle cx="32" cy="32" r="12" fill="#FFB300" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        return (
          <line key={i}
            x1={32 + Math.cos(angle) * 16} y1={32 + Math.sin(angle) * 16}
            x2={32 + Math.cos(angle) * 24} y2={32 + Math.sin(angle) * 24}
            stroke="#FF6B00" strokeWidth="3" strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function RainIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <ellipse cx="32" cy="22" rx="18" ry="10" fill="rgba(100,180,255,0.3)" />
      <ellipse cx="22" cy="20" rx="12" ry="8" fill="rgba(100,180,255,0.3)" />
      <ellipse cx="42" cy="20" rx="12" ry="8" fill="rgba(100,180,255,0.3)" />
      {[20, 28, 36, 44].map((x, i) => (
        <line key={i} x1={x} y1={34 + i * 2} x2={x - 3} y2={44 + i * 2}
          stroke="#29B6F6" strokeWidth="2" strokeLinecap="round"
          opacity={0.7 + i * 0.08} />
      ))}
    </svg>
  );
}

function SnowIcon() {
  return (
    <div className="text-4xl" style={{ animation: 'snowSpin 4s linear infinite' }}>❄️</div>
  );
}

export default memo(function WeatherCard({ feelsLike, temp, humidity, windSpeed, cityName, conditionId, descriptionBn }: Props) {
  const severity = getSeverity(feelsLike);
  const conditions = getWeatherConditions(conditionId, feelsLike);
  const [displayTemp, setDisplayTemp] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    const target = temp;
    const duration = 1500;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      setDisplayTemp(Math.round(easeOut(progress) * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    startTime.current = null;
    requestAnimationFrame(animate);
  }, [temp]);

  const isDanger = severity.level === 'danger' || severity.level === 'extreme';

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card p-6 ${isDanger ? 'severity-glow' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-bangla" style={{ color: 'rgba(250,250,250,0.5)' }}>📍 {cityName}</p>
          <p className="text-sm font-bangla" style={{ color: 'rgba(250,250,250,0.4)' }}>{descriptionBn}</p>
        </div>
        {conditions.isRain ? <RainIcon /> : conditions.isCold ? <SnowIcon /> : <SunIcon isExtreme={severity.level === 'extreme'} />}
      </div>

      <div className="flex items-end gap-2 mb-2">
        <span className="font-sora font-extrabold leading-none" style={{ fontSize: '80px', color: severity.color }}>
          {displayTemp}°
        </span>
        <div className="pb-3">
          <p className="text-sm font-bangla" style={{ color: 'rgba(250,250,250,0.5)' }}>প্রকৃত</p>
          <p className="text-xs font-bangla" style={{ color: 'rgba(250,250,250,0.5)' }}>অনুভূত {feelsLike}°C</p>
        </div>
      </div>

      <div className="rounded-2xl p-3 mb-4" style={{ background: `${severity.color}15`, border: `1px solid ${severity.color}30` }}>
        <p className="text-sm font-bangla font-bold" style={{ color: severity.color }}>{severity.label}</p>
        <p className="text-xs font-bangla mt-1" style={{ color: 'rgba(250,250,250,0.6)' }}>{severity.message}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'আর্দ্রতা', value: `${humidity}%`, icon: '💧' },
          { label: 'বাতাস', value: `${windSpeed} m/s`, icon: '🌬️' },
          { label: 'অবস্থা', value: descriptionBn.slice(0, 10), icon: conditions.isRain ? '🌧️' : conditions.isCold ? '❄️' : '☀️' },
        ].map((stat, i) => (
          <div key={i} className="text-center p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="text-lg">{stat.icon}</div>
            <p className="font-sora text-sm font-bold">{stat.value}</p>
            <p className="text-[10px] font-bangla" style={{ color: 'rgba(250,250,250,0.4)' }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
});
