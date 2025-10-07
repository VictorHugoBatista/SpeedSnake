import { useState, useEffect } from 'react';

const useDimensions = (componentRef) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (componentRef.current) {
      const { width, height } = componentRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return dimensions;
};

export default useDimensions;
