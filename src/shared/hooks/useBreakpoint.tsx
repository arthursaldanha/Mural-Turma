import { useState, useEffect, useCallback } from 'react';

import { useTheme } from 'styled-components';

interface BreakpointProps {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export const useBreakpoint = ({ base, sm, md, lg, xl }: BreakpointProps) => {
  const { breakpoints } = useTheme();

  const [variant, setVariant] = useState(base);
  const [isFetching, setIsFetching] = useState(true);
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
  });

  const { isMobile, isTablet, isLaptop, isDesktop } = device;

  const parsePixelToNumber = (size: string) => parseInt(size, 10);

  const handleWindowResize = useCallback(() => {
    const size = window.innerWidth;

    setDevice({
      isMobile: size <= parsePixelToNumber(breakpoints.sm),
      isTablet:
        size <= parsePixelToNumber(breakpoints.md) &&
        size > parsePixelToNumber(breakpoints.sm),
      isLaptop:
        size <= parsePixelToNumber(breakpoints.lg) &&
        size > parsePixelToNumber(breakpoints.md),
      isDesktop: size > parsePixelToNumber(breakpoints.md),
    });

    setIsFetching(false);

    if (size <= parsePixelToNumber(breakpoints.sm)) {
      return setVariant(sm ?? md ?? lg ?? xl ?? base);
    }

    if (size <= parsePixelToNumber(breakpoints.md)) {
      return setVariant(md ?? lg ?? xl ?? base);
    }

    if (size <= parsePixelToNumber(breakpoints.lg)) {
      return setVariant(lg ?? xl ?? base);
    }

    if (size <= parsePixelToNumber(breakpoints.xl)) {
      return setVariant(xl ?? base);
    }

    return setVariant(base);
  }, [breakpoints, base, lg, md, sm, xl]);

  useEffect(() => handleWindowResize(), [handleWindowResize]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [handleWindowResize]);

  return { variant, isFetching, isMobile, isTablet, isLaptop, isDesktop };
};
