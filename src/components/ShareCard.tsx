import { memo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getSeverity } from '@/utils/heatLogic';
import { ForecastDay } from '@/hooks/useForecast';

interface Props {
  feelsLike: number;
  count: number;
  cityName: string;
  forecast?: ForecastDay[];
}

export default memo(function ShareCard({ feelsLike, count, cityName, forecast }: Props) {
  const severity = getSeverity(feelsLike);

  const forecastText = forecast && forecast.length >= 3
    ? `\n📅 আগামী ৩ দিনের পূর্বাভাস:\n${forecast[0].dayName}: ${forecast[0].maxFeels}°C ${forecast[0].icon}\n${forecast[1].dayName}: ${forecast[1].maxFeels}°C ${forecast[1].icon}\n${forecast[2].dayName}: ${forecast[2].maxFeels}°C ${forecast[2].icon}\n`
    : '';

  const shareText = `🌡️ HeatBD Alert!\nআমার এলাকায় (${cityName}) এখন ${feelsLike}°C অনুভূত হচ্ছে!\n${severity.message}${forecastText}\n💧 আজ ${count}/৮ গ্লাস পানি পান করেছি।\n👉 HeatBD.com\n#HeatBD #তীব্রগরম #Bangladesh`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
    toast.success('কপি হয়েছে! ✅');
  };

  const handleFBShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://heatbd.com')}&quote=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="glass-card p-5"
    >
      <h2 className="font-bangla font-bold text-base mb-3">📤 শেয়ার করুন</h2>
      <div className="space-y-2">
        <button onClick={handleFBShare}
          className="w-full py-3 rounded-2xl font-bangla font-bold text-sm min-h-[48px]"
          style={{ background: 'linear-gradient(135deg, #1877F2, #0D5DBF)' }}>
          📘 Facebook এ শেয়ার করুন
        </button>
        <button onClick={handleCopy}
          className="w-full py-3 rounded-2xl font-bangla font-bold text-sm min-h-[48px]"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
          📋 টেক্সট কপি করুন
        </button>
      </div>
    </motion.div>
  );
});
