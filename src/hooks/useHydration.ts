import { useState, useEffect, useCallback } from 'react';

export function useHydration() {
  const today = new Date().toDateString();
  const storageKey = `heatbd-hydration-${today}`;
  const streakKey = 'heatbd-hydration-streak';
  const timelineKey = `heatbd-hydration-timeline-${today}`;

  const [glasses, setGlasses] = useState<boolean[]>(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) return JSON.parse(stored);
    Object.keys(localStorage)
      .filter(k => k.startsWith('heatbd-hydration-') && k !== storageKey && !k.includes('streak') && !k.includes('timeline'))
      .forEach(k => localStorage.removeItem(k));
    return new Array(8).fill(false);
  });

  const [timeline, setTimeline] = useState<string[]>(() => {
    const stored = localStorage.getItem(timelineKey);
    return stored ? JSON.parse(stored) : [];
  });

  const [streak, setStreak] = useState<number>(() => {
    const stored = localStorage.getItem(streakKey);
    if (!stored) return 0;
    const { count, lastDate } = JSON.parse(stored);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastDate === today || lastDate === yesterday.toDateString()) return count;
    return 0;
  });

  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(glasses));
  }, [glasses, storageKey]);

  useEffect(() => {
    localStorage.setItem(timelineKey, JSON.stringify(timeline));
  }, [timeline, timelineKey]);

  // Update streak when 8 glasses completed
  useEffect(() => {
    const count = glasses.filter(Boolean).length;
    if (count === 8) {
      const stored = localStorage.getItem(streakKey);
      const prev = stored ? JSON.parse(stored) : { count: 0, lastDate: '' };
      if (prev.lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const newStreak = prev.lastDate === yesterday.toDateString() ? prev.count + 1 : 1;
        setStreak(newStreak);
        localStorage.setItem(streakKey, JSON.stringify({ count: newStreak, lastDate: today }));
      }
    }
  }, [glasses, today]);

  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const ms = midnight.getTime() - Date.now();
    const timer = setTimeout(() => {
      setGlasses(new Array(8).fill(false));
      setTimeline([]);
      localStorage.removeItem(storageKey);
      localStorage.removeItem(timelineKey);
    }, ms);
    return () => clearTimeout(timer);
  }, [storageKey, timelineKey]);

  const toggleGlass = useCallback((i: number) => {
    setGlasses(prev => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });

    const wasFilled = glasses[i];
    const now = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
    setTimeline(t => (!wasFilled ? [...t, now] : t.slice(0, -1)));

    const count = glasses.filter(Boolean).length + (wasFilled ? -1 : 1);
    if (count === 8) {
      setTimeout(() => setShowCelebration(true), 300);
    }
  }, [glasses]);

  const count = glasses.filter(Boolean).length;
  const remaining = 8 - count;

  const getMessage = () => {
    if (count === 0) return "💧 আজ এখনো শুরু করেননি। পান করুন!";
    if (count <= 2) return "শুরু হয়েছে! আরও পান করুন 💪";
    if (count <= 4) return "ভালো করছেন! মাঝপথে 👍";
    if (count <= 6) return "প্রায় হয়ে গেল! আর একটু 🎯";
    if (count === 7) return "মাত্র একটি বাকি! শেষ করুন 🏁";
    return "🎉 অসাধারণ! আজকের লক্ষ্য পূরণ!";
  };

  // Estimate ml consumed (250ml per glass)
  const mlConsumed = count * 250;
  const mlTarget = 2000; // 8 * 250

  return { 
    glasses, toggleGlass, count, remaining, message: getMessage(), 
    showCelebration, setShowCelebration, streak, timeline,
    mlConsumed, mlTarget
  };
}
