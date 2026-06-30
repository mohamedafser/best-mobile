"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  duration: number; // in seconds
  autoStart?: boolean;
  onComplete?: () => void;
  persistKey?: string; // optional localStorage key
};

export const useCountdown = ({
  duration,
  autoStart = true,
  onComplete,
  persistKey,
}: Options) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 🔹 Initialize from localStorage (optional persistence)
  useEffect(() => {
    if (persistKey) {
      const savedEnd = localStorage.getItem(persistKey);

      if (savedEnd) {
        const remaining = Math.floor((parseInt(savedEnd) - Date.now()) / 1000);

        if (remaining > 0) {
          setTimeLeft(remaining);
        } else {
          localStorage.removeItem(persistKey);
        }
      } else if (autoStart) {
        const endTime = Date.now() + duration * 1000;
        localStorage.setItem(persistKey, endTime.toString());
      }
    }
  }, []);

  // 🔹 Timer logic
  useEffect(() => {
    if (!autoStart) return;

    if (timeLeft <= 0) {
      onComplete?.();
      if (persistKey) localStorage.removeItem(persistKey);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeLeft]);

  // 🔹 Controls
  const reset = () => {
    setTimeLeft(duration);
    if (persistKey) {
      const endTime = Date.now() + duration * 1000;
      localStorage.setItem(persistKey, endTime.toString());
    }
  };

  return { timeLeft, reset };
};
