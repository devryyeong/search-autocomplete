import { useEffect, useRef } from "react";

const useOnclickOutside = (callback: () => void) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const el = ref?.current;

      if (!e || el?.contains(e.target as Node)) {
        return;
      }

      callback();
    };

    document.addEventListener('click', listener);
  
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [callback]);

  return ref;
};

export default useOnclickOutside;