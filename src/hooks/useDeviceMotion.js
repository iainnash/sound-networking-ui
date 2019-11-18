import React from 'react';
// originally from: https://raw.githubusercontent.com/jaredpalmer/the-platform/master/src/useDeviceMotion.tsx
export const useDeviceMotion = () => {
  
  const [motion, setMotion] = React.useState({
    acceleration: {
      x: null,
      y: null,
      z: null,
    },
    accelerationIncludingGravity: {
      x: null,
      y: null,
      z: null,
    },
    rotationRate: {
      alpha: null,
      beta: null,
      gamma: null,
    },
    interval: 0,
    lastShaken: 0,
  });

  React.useEffect(() => {
    let lastMotions = [];
    let lastShaken = null;
    const handle = (deviceMotionEvent) => {
      if (deviceMotionEvent.interval < 200) {
        lastMotions.push(deviceMotionEvent.acceleration.x)
      } else {
        lastMotions = [];
      }
      if (lastMotions.length > 3) {
        lastShaken = new Date().getTime();
        lastMotions = [];
      }
      deviceMotionEvent.lastShaken = lastShaken;
      setMotion(deviceMotionEvent);
    };

    window.addEventListener('devicemotion', handle);

    return () => {
      window.removeEventListener('devicemotion', handle);
    };
  }, []);

  return motion;
};
