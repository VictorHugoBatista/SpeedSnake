import { useGameStore } from "../../states/main";

import useIsDesktop from "../../../hooks/isDesktop";

const Overlays = function () {
  // Hooks.
  const isDesktop = useIsDesktop();

  // Game states.
  const isPaused = useGameStore(state => state.isPaused);
  const showStartOverlay = useGameStore(state => state.showStartOverlay);
  const showEndOverlay = useGameStore(state => state.showEndOverlay);
  const showReadyCountOverlay = useGameStore(state => state.showReadyCountOverlay);
  const readyCountTimeRegressive = useGameStore(state => state.readyCountTimeRegressive);

  // Game state methods.
  const startReadyCount = useGameStore(state => state.startReadyCount);

  return (
    <>
      <div className={`game-area-overlay clickable ${showStartOverlay ? 'active' : ''}`} onClick={() => startReadyCount()}>
        {isDesktop ? <span>Press Start or click here</span> : null}
        {! isDesktop ? <span>Tap to start</span> : null}
      </div>
      <div className={`game-area-overlay clickable ${showEndOverlay ? 'active' : ''}`} onClick={() => startReadyCount()}>
        <span>You lose!</span>
        {isDesktop ? <span>Press Start or click to restart</span> : null}
        {! isDesktop ? <span>Tap to restart</span> : null}
      </div>
      <div className={`game-area-overlay ${showReadyCountOverlay ? 'active' : ''}`}>
        <span>Ready</span>
        <span>{readyCountTimeRegressive}</span>
      </div>
      <div className={`game-area-overlay ${isPaused ? 'active' : ''}`}>Paused</div>
    </>
  );
};

export default Overlays;