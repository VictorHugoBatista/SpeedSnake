import { useEffect, useState } from "react";

import useScreenSize from "../../utils/screenSize";

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

  return (
    <>
      <div className="button-virtual-buttons">
        <div className="button button-blue" onClick={toggleControls}>Virtual controls</div>
        <span>Press P to Pause</span>
      </div>
      {showControls ?
        <div className="controls">
          <div className="controls-up">
            <div className="button controls-button">up</div>
          </div>
          <div className="controls-down">
            <div className="button controls-button">left</div>
            <div className="button controls-button">down</div>
            <div className="button controls-button">right</div>
          </div>
        </div>
      : null}
    </>
  );
};

export default Controls;
