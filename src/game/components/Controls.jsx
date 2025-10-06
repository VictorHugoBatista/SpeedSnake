const Controls = function () {
  return (
    <>
      <div class="button-virtual-buttons">
        <span>Press P to Pause</span>
        <div className="button button-blue">Virtual controls</div>
      </div>
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
    </>
  );
};

export default Controls;
