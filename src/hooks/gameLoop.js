import { useEffect, useRef } from "react";

const useGameLoop = function (gameLoopCallback) {
  const animationFrameId = useRef(null);
  let lastUpdateTime = useRef(0);

  useEffect(() => {
    const gameLoop = (currentTime) => {
      const deltaTime = currentTime - lastUpdateTime.current;
      lastUpdateTime.current = currentTime;

      gameLoopCallback(deltaTime);

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    lastUpdateTime.current = performance.now();
    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [gameLoopCallback]);
};

export default useGameLoop;
