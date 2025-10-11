import { useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";

import { useGameStore } from "../states/store";
import useScreenSize from "../../hooks/screenSize";
import useGameLoop from "../hooks/gameLoop";
import useDimensions from "../../hooks/dimensions";

const GameArea = function () {
  // Hooks.
  const gameAreaRef = useRef(null);
  const dimensions = useDimensions(gameAreaRef);
  const screenSize = useScreenSize();

  // Game states.
  const isPaused = useGameStore(state => state.isPaused);
  const gameArea = useGameStore(state => state.gameArea);
  const showStartOverlay = useGameStore(state => state.showStartOverlay);
  const showEndOverlay = useGameStore(state => state.showEndOverlay);
  const showReadyCountOverlay = useGameStore(state => state.showReadyCountOverlay);
  const readyCountTimeRegressive = useGameStore(state => state.readyCountTimeRegressive);

  // Game state methods.
  const startReadyCount = useGameStore(state => state.startReadyCount);
  const mainLoopIteration = useGameStore(state => state.mainLoopIteration);

  const gameLoop = (deltaTime) => {
    mainLoopIteration(deltaTime);
  };
  useGameLoop(gameLoop);

  return (
    <div className={`game-area`} ref={gameAreaRef}>
      <div className={`game-area-overlay clickable ${showStartOverlay ? 'active' : ''}`} onClick={() => startReadyCount()}>
        {screenSize.width >= 768 ? <span>Press Start or click here</span> : null}
        {screenSize.width < 768 ? <span>Tap to start</span> : null}
      </div>
      <div className={`game-area-overlay clickable ${showEndOverlay ? 'active' : ''}`} onClick={() => startReadyCount()}>
        <span>You lose!</span>
        {screenSize.width >= 768 ? <span>Press Start or click to restart</span> : null}
        {screenSize.width < 768 ? <span>Tap to restart</span> : null}
      </div>
      <div className={`game-area-overlay ${showReadyCountOverlay ? 'active' : ''}`}>
        <span>Ready</span>
        <span>{readyCountTimeRegressive}</span>
      </div>
      <div className={`game-area-overlay ${isPaused ? 'active' : ''}`}>Paused</div>

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
  );
};

export default GameArea;
