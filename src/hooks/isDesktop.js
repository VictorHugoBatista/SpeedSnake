import { useState, useEffect } from 'react';

import useScreenSize from './screenSize';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const screenSize = useScreenSize();

  useEffect(() => {
    setIsDesktop(screenSize.width >= 992);
  }, [isDesktop, screenSize]);

  return isDesktop;
};

export default useIsDesktop;
