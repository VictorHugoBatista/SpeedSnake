import { useEffect, useState } from "react";

import useScreenSize from "../../hooks/screenSize";
import useKeyboardShortcut from "../../hooks/keyboardShortcut";

import { useGameStore } from "../states/store";

const Controls = function () {
  const screenSize = useScreenSize();

  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (screenSize.width < 768) {
      setShowControls(true);
    }
  }, [screenSize]);

  const toggleControls = () => {
    setShowControls((showControls) => ! showControls);
  };

  const changeDirection = useGameStore(state => state.changeDirection);

  const changeDirectionEvents = {
    UP: () => changeDirection("UP"),
    LEFT: () => changeDirection("LEFT"),
    DOWN: () => changeDirection("DOWN"),
    RIGHT: () => changeDirection("RIGHT"),
  };

  useKeyboardShortcut({
    keys: ["w", "arrowup"],
    onKeyPressed: () => changeDirectionEvents["UP"](),
  });
  useKeyboardShortcut({
    keys: ["a", , "arrowleft"],
    onKeyPressed: () => changeDirectionEvents["LEFT"](),
  });
  useKeyboardShortcut({
    keys: ["s", "arrowdown"],
    onKeyPressed: () => changeDirectionEvents["DOWN"](),
  });
  useKeyboardShortcut({
    keys: ["d", "arrowright"],
    onKeyPressed: () => changeDirectionEvents["RIGHT"](),
  });

  useKeyboardShortcut({
    keys: ["p"],
    onKeyPressed: () => console.log('PAUSE'),
  });

  return (
    <>
      <div className="button-virtual-buttons">
        <div className="button button-blue" onClick={toggleControls}>Virtual controls</div>
        <div class="controls-text">
          <div>or press WSAD / arrow keys do play</div>
          <div>Press P to Pause</div>
        </div>
      </div>
      {showControls ?
        <div className="controls">
          <div className="controls-up">
            <div className="button controls-button" onClick={() => changeDirectionEvents["UP"]()}>up</div>
          </div>
          <div className="controls-down">
            <div className="button controls-button" onClick={() => changeDirectionEvents["LEFT"]()}>left</div>
            <div className="button controls-button" onClick={() => changeDirectionEvents["DOWN"]()}>down</div>
            <div className="button controls-button" onClick={() => changeDirectionEvents["RIGHT"]()}>right</div>
          </div>
        </div>
      : null}
    </>
  );
};

export default Controls;
