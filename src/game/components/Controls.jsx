import { useEffect, useState } from "react";

import useIsDesktop from "../../hooks/isDesktop";
import useKeyboardShortcut from "../../hooks/keyboardShortcut";

import { DirectionEnum } from "../enums/directions.js";

import { useGameStore } from "../states/main";

const Controls = function () {
  const isDesktop = useIsDesktop();

  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (! isDesktop) {
      setShowControls(true);
    }
  }, [isDesktop]);

  const toggleControls = () => {
    setShowControls((showControls) => ! showControls);
  };

  // Game states.
  const showEndOverlay = useGameStore(state => state.showEndOverlay);

  // Game state methods.
  const changeDirection = useGameStore(state => state.changeDirection);
  const togglePause = useGameStore(state => state.togglePause);
  const startReadyCount = useGameStore(state => state.startReadyCount);
  const openStartOverlay = useGameStore(state => state.openStartOverlay);

  useKeyboardShortcut({
    keys: ["w", "arrowup", "k"],
    onKeyPressed: () => changeDirection(DirectionEnum.UP),
  });
  useKeyboardShortcut({
    keys: ["a", "arrowleft", "h"],
    onKeyPressed: () => changeDirection(DirectionEnum.LEFT),
  });
  useKeyboardShortcut({
    keys: ["s", "arrowdown", "j"],
    onKeyPressed: () => changeDirection(DirectionEnum.DOWN),
  });
  useKeyboardShortcut({
    keys: ["d", "arrowright", "l"],
    onKeyPressed: () => changeDirection(DirectionEnum.RIGHT),
  });

  useKeyboardShortcut({
    keys: ["enter"],
    onKeyPressed: () => showEndOverlay ?
      openStartOverlay() : startReadyCount(),
  });

  useKeyboardShortcut({
    keys: ["p"],
    onKeyPressed: () => togglePause(),
  });

  return (
    <>
      <div className="button-virtual-buttons">
        <div className="button button-blue" onClick={toggleControls}>Virtual controls</div>
        <div className="controls-text">
          <div>or press WSAD / arrow keys do play</div>
          <div>Press P to Pause</div>
        </div>
      </div>
      {showControls ?
        <div className="controls">
          <div className="controls-up">
            <div className="button controls-button" onClick={() => changeDirection(DirectionEnum.UP)}>up</div>
          </div>
          <div className="controls-down">
            <div className="button controls-button" onClick={() => changeDirection(DirectionEnum.LEFT)}>left</div>
            <div className="button controls-button" onClick={() => changeDirection(DirectionEnum.DOWN)}>down</div>
            <div className="button controls-button" onClick={() => changeDirection(DirectionEnum.RIGHT)}>right</div>
          </div>
        </div>
      : null}
    </>
  );
};

export default Controls;
