import { Stage as KonvaStage, Layer, Rect } from "react-konva";

import { useGameStore } from "../../states/main";

import { objectToGameArea } from "../../entity/sets/game-area";

const Stage = function ({ dimensions }) {
  // Game states.
  const gameAreaObject = useGameStore(state => state.gameArea);
  const gameArea = objectToGameArea(gameAreaObject);

  return (
    <KonvaStage width={dimensions.width} height={dimensions.height} className="game-area-canvas-wrapper">
      <Layer>
        {gameArea.renderMap(dimensions, (renderObject) => (<Rect
          key={renderObject.key}
          x={renderObject.x}
          y={renderObject.y}
          width={renderObject.width}
          height={renderObject.height}
          fill="#fa9d46"
        />))}
      </Layer>
    </KonvaStage>
  );
};

export default Stage;