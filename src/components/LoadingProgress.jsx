import { useEffect, useState } from 'react';

export default function LoadingProgress() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-14 h-[100px] absolute left-1/2 translate-y-1/2">
      <svg viewBox="0 0 100 100">
        <circle className="fill-none stroke-border-input stroke-[7px]" style={{ strokeDasharray: 283, strokeDashoffset: 0 }} cx="50" cy="50" r="45" />
        <circle
          className="fill-none stroke-pink stroke-[7px]" cx="50" cy="50" r="45"
          style={{ strokeDasharray: 283, strokeDashoffset: ` calc(283 - (283 * ${progress}) / 100)`, transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <text className="text-2xl fill-pink font-semibold" x="50" y="50" textAnchor="middle" dominantBaseline="middle">
          {`${progress}%`}
        </text>
      </svg>
    </div>
  );
}
