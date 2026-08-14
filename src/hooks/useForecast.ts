import { useState, useEffect, useCallback } from 'react';
import { weatherBangla } from '@/utils/heatLogic';

const CACHE_KEY = 'heatbd-forecast';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export interface ForecastDay {
  date: Date;
  dayName: string;
  maxFeels: number;
  minFeels: number;
  maxTemp: number;
  humidity: number;
  conditionId: number;
  condition: string;
  descriptionBn: string;
  icon: string;
}

interface OpenWeatherForecastItem {
  dt_txt: string;
  main: { feels_like: number; temp: number; humidity: number };
  weather: { id: number; main: string; description: string }[];
}

interface OpenWeatherForecastResponse {
  list: OpenWeatherForecastItem[];
}

interface CachedForecast {
  data: (Omit<ForecastDay, 'date'> & { date: string })[];
  timestamp: number;
}

function getWeatherIcon(conditionId: number): string {
  if (conditionId >= 200 && conditionId <= 232) return '⛈️';
  if (conditionId >= 300 && conditionId <= 321) return '🌦️';
  if (conditionId >= 500 && conditionId <= 531) return '🌧️';
  if (conditionId >= 600 && conditionId <= 622) return '❄️';
  if (conditionId >= 700 && conditionId <= 781) return '🌫️';
  if (conditionId >= 800 && conditionId <= 801) return '☀️';
  if (conditionId >= 802 && conditionId <= 804) return '⛅';
  return '☀️';
}

function getMostFrequent(arr: number[]): number {
  const freq: Record<number, number> = {};
  arr.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
  return Number(Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0]);
}

export function useForecast() {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = useCallback(async (force = false) => {
    const now = Date.now();

    if (!force) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed: CachedForecast = JSON.parse(cached);
          if (now - parsed.timestamp < CACHE_DURATION) {
            setForecast(parsed.data.map(d => ({ ...d, date: new Date(d.date) })));
            setLoading(false);
            return;
          }
        } catch {
          localStorage.removeItem(CACHE_KEY);
        }
      }
    }

    setLoading(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
      });

      const { latitude, longitude } = position.coords;
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      if (!apiKey) {
        setError('api');
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&cnt=24`
      );
      if (!res.ok) throw new Error('API error');
      const json: OpenWeatherForecastResponse = await res.json();

      const today = new Date().toISOString().split('T')[0];
      const grouped: Record<string, OpenWeatherForecastItem[]> = {};
      json.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (date === today) return; // skip today
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(item);
      });

      const days: ForecastDay[] = Object.entries(grouped).slice(0, 3).map(([dateStr, items]) => {
        const date = new Date(dateStr);
        const conditionId = getMostFrequent(items.map(i => i.weather[0].id));
        const conditionItem = items.find(i => i.weather[0].id === conditionId) || items[0];
        const desc = conditionItem.weather[0].description;

        return {
          date,
          dayName: date.toLocaleDateString('bn-BD', { weekday: 'long' }),
          maxFeels: Math.round(Math.max(...items.map(i => i.main.feels_like))),
          minFeels: Math.round(Math.min(...items.map(i => i.main.feels_like))),
          maxTemp: Math.round(Math.max(...items.map(i => i.main.temp))),
          humidity: Math.round(items.reduce((s, i) => s + i.main.humidity, 0) / items.length),
          conditionId,
          condition: conditionItem.weather[0].main,
          descriptionBn: weatherBangla[desc] || desc,
          icon: getWeatherIcon(conditionId),
        };
      });

      setForecast(days);
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: days, timestamp: now }));
      setError(null);
    } catch (err) {
      if (err instanceof GeolocationPositionError && err.code === 1) setError('location');
      else setError('api');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  return { forecast, loading, error, refetch: () => fetchForecast(true) };
}
