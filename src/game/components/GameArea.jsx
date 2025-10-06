import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";

const GameArea = function () {
  const gameAreaRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  console.log('dimensions 1', dimensions);
  useEffect(() => {
    if (gameAreaRef.current) {
      const { width, height } = gameAreaRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      console.log('dimensions 2', {width, height});
    }
  }, []);

  return (
    <>
      <div className="game-area" ref={gameAreaRef}>
        <Stage width={dimensions.width} height={dimensions.height}>
          <Layer>
            <Rect
              x={500}
              y={500}
              width={100}
              height={100}
              fill="red"
              shadowBlur={10}
              draggable
            />
            <Circle
              x={100}
              y={100}
              radius={50}
              fill="green"
              draggable
            />
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default GameArea;
