import { useCallback, useEffect, useState } from 'react';

export const useIsTouchedDevice = () => {
  const [isTouchedDevice, setIsTouchedDevice] = useState(false);

  const checkingIsTouchedDevice = useCallback(() => {
    setIsTouchedDevice(Boolean(window.matchMedia('(pointer: coarse)').matches));
  }, []);

  useEffect(() => checkingIsTouchedDevice);

  return { isTouchedDevice };
};
