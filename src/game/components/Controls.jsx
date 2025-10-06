import { useEffect, useState } from "react";

import useScreenSize from "../../utils/screenSize";

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

  return (
    <>
      <div className="button-virtual-buttons">
        <div className="button button-blue" onClick={toggleControls}>Virtual controls</div>
        <span>Press P to Pause</span>
      </div>
      {showControls ?
        <div className="controls">
          <div className="controls-up">
            <div className="button controls-button" onClick={changeDirection("UP")}>up</div>
          </div>
          <div className="controls-down">
            <div className="button controls-button" onClick={changeDirection("LEFT")}>left</div>
            <div className="button controls-button" onClick={changeDirection("DOWN")}>down</div>
            <div className="button controls-button" onClick={changeDirection("RIGHT")}>right</div>
          </div>
        </div>
      : null}
    </>
  );
};

export default Controls;
