import { useRef } from "react";

function useDebounce<T extends (...args: unknown[]) => void>(
  func: T,
  timeout = 300
): (...args: Parameters<T>) => void {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (...args: Parameters<T>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export default useDebounce;
