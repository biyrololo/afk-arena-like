import { useEffect, useRef, useState } from "react";

type Options = {
  speed?: number; // скорость "догоняния"
  format?: (value: number) => string;
};

export function useSmoothCounter(value: number, options: Options = {}) {
  const { speed = 10, format } = options;

  const [displayValue, setDisplayValue] = useState(value);

  const currentRef = useRef(value);
  const targetRef = useRef(value);
  const rafRef = useRef<number>(undefined);

  targetRef.current = value;

  useEffect(() => {
    const update = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      const diff = target - current;

      if (Math.abs(diff) < 0.01) {
        currentRef.current = target;
      } else {
        currentRef.current += diff * 0.15 * speed * 0.016;
      }

      setDisplayValue(currentRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const output = format
    ? format(displayValue)
    : Math.floor(displayValue).toString();

  return output;
}