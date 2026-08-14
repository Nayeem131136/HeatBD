import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useWeather } from '@/hooks/useWeather';
import { useHydration } from '@/hooks/useHydration';
import { useForecast } from '@/hooks/useForecast';
import { getWeatherConditions, getSeverity } from '@/utils/heatLogic';
import Header from '@/components/Header';
import WeatherCard from '@/components/WeatherCard';
import AlertBanner from '@/components/AlertBanner';
import TipsCarousel from '@/components/TipsCarousel';
import ShareCard from '@/components/ShareCard';
import ForecastSection from '@/components/ForecastSection';
import BottomNav from '@/components/BottomNav';
import FloatingEmergencyButton from '@/components/FloatingEmergencyButton';
import WeatherAnimations from '@/components/WeatherAnimations';

const HydrationTracker = lazy(() => import('@/components/HydrationTracker'));
const EmergencyTab = lazy(() => import('@/components/EmergencyTab'));

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const transitionDuration = isMobile ? 0.2 : 0.5;

function LazyFallback() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px', fontFamily: 'Hind Siliguri' }}>
      লোড হচ্ছে...
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="glass-card p-6 animate-pulse">
          <div className="h-4 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.06)', width: '40%' }} />
          <div className="h-16 rounded-2xl mb-3" style={{ background: 'rgba(255,255,255,0.04)' }} />
          <div className="h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', width: '70%' }} />
        </div>
      ))}
    </div>
  );
}

function ErrorState({ type, onRetry }: { type: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <span className="text-5xl mb-4">{type === 'location' ? '📍' : '😔'}</span>
      <p className="font-bangla font-bold text-lg mb-2">
        {type === 'location' ? 'লোকেশন অ্যাক্সেস দিন' : 'সংযোগ সমস্যা'}
      </p>
      <p className="font-bangla text-sm mb-6" style={{ color: 'rgba(250,250,250,0.5)' }}>
        {type === 'location'
          ? 'আবহাওয়ার তথ্য পেতে আপনার লোকেশন প্রয়োজন।'
          : 'ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।'}
      </p>
      <button onClick={onRetry}
        className="px-8 py-3 rounded-2xl font-bangla font-bold text-sm min-h-[48px]"
        style={{ background: 'linear-gradient(135deg, #FF6B00, #FF2D00)' }}>
        🔄 আবার চেষ্টা করুন
      </button>
    </div>
  );
}

export default function Index() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (newTab: number) => {
    setActiveTab(newTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const weather = useWeather();
  const hydration = useHydration();
  const forecastData = useForecast();
  const toastShownRef = useRef(false);

  const conditions = getWeatherConditions(weather.conditionId, weather.feelsLike);
  const severity = getSeverity(weather.feelsLike);

  // Toast notifications
  useEffect(() => {
    if (weather.loading || weather.error || toastShownRef.current) return;
    toastShownRef.current = true;

    toast.info(`📍 ${weather.cityName} — ${weather.feelsLike}°C অনুভূত হচ্ছে।`, { duration: 4000 });

    if (severity.level === 'danger') {
      setTimeout(() => toast.warning('⚠️ সাবধান! বাইরে যাওয়ার আগে পানি পান করুন।', { duration: 6000 }), 1000);
    }
    if (severity.level === 'extreme') {
      setTimeout(() => toast.error('🚨 জরুরি! ঘর থেকে বের হবেন না!', { duration: 10000 }), 1000);
    }
    if (weather.feelsLike > 42) {
      setTimeout(() => toast.error('🚨 অতি বিপজ্জনক! হিটস্ট্রোকের তাৎক্ষণিক ঝুঁকি!', { duration: 10000 }), 2000);
    }
    if (conditions.isRain) {
      setTimeout(() => {
        if (conditions.isThunderstorm) {
          toast.warning('⛈️ ঝড়-বৃষ্টির সতর্কতা! বাইরে না যাওয়াই ভালো।');
        } else {
          toast.info('🌧️ বৃষ্টি হচ্ছে! ছাতা নিন।', { duration: 6000 });
        }
      }, 1500);
    }
    if (conditions.isCold) {
      setTimeout(() => toast.info('🧥 শীতল আবহাওয়া! গরম কাপড় পরুন।', { duration: 5000 }), 1500);
    }
  }, [weather.loading, weather.error, weather.cityName, weather.feelsLike, severity.level, conditions.isRain, conditions.isThunderstorm, conditions.isCold]);

  // Hydration reminders
  useEffect(() => {
    if (weather.loading) return;
    const interval = setInterval(() => {
      if (hydration.count < 8) {
        toast.info(`💧 মনে করিয়ে দিচ্ছি — পানি পান করুন! (${hydration.count}/8)`, { duration: 5000 });
      }
    }, 45 * 60 * 1000);
    return () => clearInterval(interval);
  }, [weather.loading, hydration.count]);

  // Pause animations when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      const state = document.hidden ? 'paused' : 'running';
      document.querySelectorAll('.rain-drop,.snow-flake,.sun-pulse,.logo-fire').forEach(el => {
        (el as HTMLElement).style.animationPlayState = state;
      });
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Background class
  const bgClass = conditions.isRain ? 'rain-mesh-bg' : conditions.isCold ? 'cold-mesh-bg' : conditions.isCloudy ? 'cloudy-mesh-bg' : 'heat-mesh-bg';

  return (
    <div className={`min-h-[100dvh] max-w-[420px] mx-auto relative overflow-x-hidden ${bgClass}`}
      style={{
        paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        transition: 'all 1.5s ease',
      }}>

      {!weather.loading && !weather.error && (
        <WeatherAnimations conditionId={weather.conditionId} feelsLike={weather.feelsLike} />
      )}

      <div className="relative z-10">
        <Header lastUpdated={weather.lastUpdated} onRefresh={() => { weather.refetch(); forecastData.refetch(); }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab > 0 ? -30 : 30 }}
            transition={{ duration: transitionDuration * 0.5 }}
            className="px-4 py-4 space-y-4"
          >
            {activeTab === 0 && (
              <>
                {weather.loading ? (
                  <LoadingSkeleton />
                ) : weather.error ? (
                  <ErrorState type={weather.error} onRetry={weather.refetch} />
                ) : (
                  <>
                    <WeatherCard
                      feelsLike={weather.feelsLike} temp={weather.temp}
                      humidity={weather.humidity} windSpeed={weather.windSpeed}
                      cityName={weather.cityName} conditionId={weather.conditionId}
                      descriptionBn={weather.descriptionBn}
                    />
                    <AlertBanner feelsLike={weather.feelsLike} />
                    <ForecastSection forecast={forecastData.forecast} loading={forecastData.loading} />
                    <TipsCarousel conditionId={weather.conditionId} feelsLike={weather.feelsLike} />
                    <ShareCard feelsLike={weather.feelsLike} count={hydration.count} cityName={weather.cityName} forecast={forecastData.forecast} />
                  </>
                )}
              </>
            )}

            {activeTab === 1 && (
              <Suspense fallback={<LazyFallback />}>
                <HydrationTracker {...hydration} />
              </Suspense>
            )}

            {activeTab === 2 && (
              <Suspense fallback={<LazyFallback />}>
                <EmergencyTab />
              </Suspense>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center py-6 px-4">
          <p className="font-bangla text-[11px] mb-1" style={{ color: 'rgba(250,250,250,0.35)' }}>
            Developed by{' '}
            <a href="https://mahdi-hasan-nayeem-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="underline font-semibold" style={{ color: 'rgba(250,250,250,0.5)' }}>
              Md. Mahdi Hasan Nayeem
            </a>
          </p>
          <p className="font-bangla text-[11px]" style={{ color: 'rgba(250,250,250,0.2)' }}>
            © 2025 HeatBD.com — সকলের জন্য বিনামূল্যে
          </p>
        </div>
      </div>

      {activeTab !== 2 && (
        <FloatingEmergencyButton onClick={() => handleTabChange(2)} />
      )}

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
