import { useEffect, useRef } from "react";

import { useGameStore } from "../../states/main";

import useDimensions from "../../../hooks/dimensions";
import useIsDesktop from "../../../hooks/isDesktop";
import useGameLoop from "../../hooks/game-loop";

import Overlays from "./Overlays";
import Stage from "./Stage";

const GameArea = function () {
  // Hooks.
  const gameAreaRef = useRef(null);
  const dimensions = useDimensions(gameAreaRef);
  const isDesktop = useIsDesktop();

  // Game state methods.
  const mainLoopIteration = useGameStore(state => state.mainLoopIteration);
  const setEntitySize = useGameStore(state => state.setEntitySize);

  useEffect(() => {
    setEntitySize(isDesktop ? 2.5 : 5);
  }, [setEntitySize, isDesktop]);

  const gameLoop = (deltaTime) => {
    mainLoopIteration(deltaTime);
  };
  useGameLoop(gameLoop);

  return (
    <div className={`game-area`} ref={gameAreaRef}>
      <Overlays />
      <Stage dimensions={dimensions} />
    </div>
  );
};

export default GameArea;
