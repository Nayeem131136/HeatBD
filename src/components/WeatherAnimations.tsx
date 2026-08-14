import { memo, useMemo } from 'react';
import { getWeatherConditions } from '@/utils/heatLogic';

interface Props {
  conditionId: number;
  feelsLike: number;
}

const gpuStyle = {
  willChange: 'transform' as const,
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden' as const,
  WebkitBackfaceVisibility: 'hidden' as const,
};

export default memo(function WeatherAnimations({ conditionId, feelsLike }: Props) {
  const conditions = getWeatherConditions(conditionId, feelsLike);

  const raindrops = useMemo(() =>
    conditions.isRain ? Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${15 + Math.random() * 10}px`,
      duration: `${0.6 + Math.random() * 0.6}s`,
      delay: `${Math.random() * 2}s`,
    })) : [], [conditions.isRain]
  );

  const snowflakes = useMemo(() =>
    conditions.isCold ? Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${8 + Math.random() * 8}px`,
      duration: `${3 + Math.random() * 4}s`,
      delay: `${Math.random() * 5}s`,
      char: Math.random() > 0.5 ? '❄' : '●',
    })) : [], [conditions.isCold]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {conditions.isRain && raindrops.map(drop => (
        <div
          key={drop.id}
          className="rain-drop absolute top-[-30px]"
          style={{
            ...gpuStyle,
            left: drop.left,
            width: '2px',
            height: drop.height,
            background: 'linear-gradient(transparent, rgba(100,180,255,0.6))',
            animation: `rainFall ${drop.duration} ${drop.delay} linear infinite`,
          }}
        />
      ))}

      {conditions.isThunderstorm && (
        <div
          className="absolute inset-0"
          style={{
            background: 'white',
            animation: 'lightning 4s infinite',
          }}
        />
      )}

      {conditions.isCold && snowflakes.map(flake => (
        <div
          key={flake.id}
          className="snow-flake absolute top-[-20px]"
          style={{
            ...gpuStyle,
            left: flake.left,
            fontSize: flake.size,
            color: 'rgba(200,230,255,0.7)',
            animation: `snowFall ${flake.duration} ${flake.delay} linear infinite`,
          }}
        >
          {flake.char}
        </div>
      ))}

      {conditions.isCloudy && (
        <>
          {[30, 45, 60].map((speed, i) => (
            <svg
              key={i}
              className="absolute"
              style={{
                ...gpuStyle,
                top: `${10 + i * 15}%`,
                opacity: 0.08,
                animation: `cloudDrift ${speed}s linear infinite`,
                animationDelay: `${i * 5}s`,
              }}
              width="200" height="80" viewBox="0 0 200 80"
            >
              <ellipse cx="100" cy="50" rx="80" ry="30" fill="white" />
              <ellipse cx="60" cy="45" rx="50" ry="25" fill="white" />
              <ellipse cx="140" cy="45" rx="50" ry="25" fill="white" />
            </svg>
          ))}
        </>
      )}
    </div>
  );
});
