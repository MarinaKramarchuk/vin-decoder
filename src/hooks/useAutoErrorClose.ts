import { useEffect } from "react";

export const useAutoErrorClose = (
  error: string | null,
  setError: (val: string | null) => void,
  delay = 5000,
) => {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [error, setError, delay]);
};
