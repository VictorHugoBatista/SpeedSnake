import { Stage as KonvaStage, Layer, Rect } from "react-konva";

import { useGameStore } from "../../states/main";

const Stage = function ({ dimensions }) {
  // Game states.
  const gameArea = useGameStore(state => state.gameArea);

  return (
    <KonvaStage width={dimensions.width} height={dimensions.height}>
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
    </KonvaStage>
  );
};

export default Stage;