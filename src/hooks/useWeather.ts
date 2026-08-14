import { useState, useEffect, useCallback, useRef } from 'react';
import { weatherBangla } from '@/utils/heatLogic';
import { findNearestDistrict } from '@/utils/bdDistricts';

const CACHE_KEY = 'heatbd-cache';
const CACHE_DURATION = 600000;

interface WeatherData {
  feelsLike: number;
  temp: number;
  humidity: number;
  windSpeed: number;
  cityName: string;
  conditionId: number;
  condition: string;
  description: string;
  descriptionBn: string;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  refetch: () => void;
}


export function useWeather(): WeatherData {
  const [data, setData] = useState<Omit<WeatherData, 'refetch' | 'loading' | 'error'>>({
    feelsLike: 0,
    temp: 0,
    humidity: 0,
    windSpeed: 0,
    cityName: '',
    conditionId: 800,
    condition: '',
    description: '',
    descriptionBn: '',
    lastUpdated: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastFetchTime = useRef(0);

  const fetchWeather = useCallback(async (force = false) => {
    const now = Date.now();

    if (!force) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (now - parsed.timestamp < CACHE_DURATION) {
            setData(parsed.data);
            setLoading(false);
            return;
          }
        } catch {
          localStorage.removeItem(CACHE_KEY);
        }
      }

      if (now - lastFetchTime.current < CACHE_DURATION) return;
    }

    setLoading(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true,
        });
      });

      const { latitude, longitude } = position.coords;
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      if (!apiKey) {
        setError('api');
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&_=${Date.now()}`
      );

      if (!res.ok) throw new Error('API error');

      const json = await res.json();

      const district = findNearestDistrict(latitude, longitude);

      const weatherData = {
        feelsLike: Math.round(json.main.feels_like),
        temp: Math.round(json.main.temp),
        humidity: json.main.humidity,
        windSpeed: Math.round(json.wind.speed * 10) / 10,
        cityName: district.bn,
        conditionId: json.weather[0].id,
        condition: json.weather[0].main,
        description: json.weather[0].description,
        descriptionBn:
          weatherBangla[json.weather[0].description] ||
          json.weather[0].description,
        lastUpdated: now,
      };

      setData(weatherData);
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data: weatherData, timestamp: now })
      );
      lastFetchTime.current = now;
      setError(null);
    } catch (err) {
      if (err instanceof GeolocationPositionError && err.code === 1) {
        setError('location');
      } else {
        setError('api');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();

    const interval = setInterval(fetchWeather, 60000);

    const handleVisibility = () => {
      if (!document.hidden) fetchWeather();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [fetchWeather]);

  return { ...data, loading, error, refetch: () => fetchWeather(true) };
}
