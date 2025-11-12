import { Stage as KonvaStage, Layer, Rect } from "react-konva";

import { useGameStore } from "../../states/main";

const Stage = function ({ dimensions }) {
  // Game states.
  const gameArea = useGameStore(state => state.gameArea);

  return (
    <KonvaStage width={dimensions.width} height={dimensions.height}>
      <Layer>
        {gameArea.map((entity, key) => (<Rect 
          key={key}
          x={(entity.x / 100) * dimensions.width}
          y={(entity.y / 100) * dimensions.height}
          width={(entity.sizeX / 100) * dimensions.width}
          height={(entity.sizeY / 100) * dimensions.height}
          fill="#fa9d46"
        />))}
      </Layer>
    </KonvaStage>
  );
};

export default Stage;