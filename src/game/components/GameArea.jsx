import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

import { useGameStore } from "../states/store";
import useGameLoop from "../../hooks/gameLoop";

const GameArea = function () {
  const gameAreaRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (gameAreaRef.current) {
      const { width, height } = gameAreaRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  const gameArea = useGameStore(state => state.gameArea);
  const makeStep = useGameStore(state => state.makeStep);
  const updateGameArea = useGameStore(state => state.updateGameArea);

  const gameLoop = () => {
    makeStep();
    updateGameArea();
  };
  useGameLoop(gameLoop);

  return (
    <>
      <div className="game-area" ref={gameAreaRef}>
        <Stage width={dimensions.width} height={dimensions.height}>
          <Layer>
            {Object.keys(gameArea).map(key => (<Rect
            key={key}
              x={(gameArea[key].x / 100) * dimensions.width}
              y={(gameArea[key].y / 100) * dimensions.height}
              width={(gameArea[key].size / 100) * dimensions.width}
              height={(gameArea[key].size / 100) * dimensions.height}
              fill="#fa9d46"
            />))}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default GameArea;
