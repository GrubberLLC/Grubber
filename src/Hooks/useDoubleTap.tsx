import { useState, useEffect } from 'react';

const useDoubleTap = (callback: () => void, delay: number = 300) => {
  const [lastTap, setLastTap] = useState(0);

  const handleDoubleTap = () => {
    const currentTime = Date.now();
    const tapGap = currentTime - lastTap;

    if (tapGap < delay && tapGap > 0) {
      callback();
    }

    setLastTap(currentTime);
  };

  return handleDoubleTap;
};

export default useDoubleTap;
