import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

import { useGameStore } from "../states/store";

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
  const updateGameArea = useGameStore(state => state.updateGameArea);

  useEffect(() => {
    updateGameArea();
  }, []);

  return (
    <>
      <div className="game-area" ref={gameAreaRef}>
        <Stage width={dimensions.width} height={dimensions.height}>
          <Layer>
            {gameArea.map(item => (<Rect
              x={(item.x / 100) * dimensions.width}
              y={(item.y / 100) * dimensions.height}
              width={(item.size / 100) * dimensions.width}
              height={(item.size / 100) * dimensions.height}
              fill="#fa9d46"
            />))}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default GameArea;
