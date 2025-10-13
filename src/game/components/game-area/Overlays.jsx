import { useGameStore } from "../../states/main";

import useIsDesktop from "../../../hooks/isDesktop";

import OverlayBase from "../overlays/OverlayBase";

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
      <OverlayBase show={showStartOverlay} onClick={() => startReadyCount()}>
        {isDesktop ? <span>Press Start or click here</span> : null}
        {! isDesktop ? <span>Tap to start</span> : null}
      </OverlayBase>
      <OverlayBase show={showEndOverlay} onClick={() => startReadyCount()}>
        <span>You lose!</span>
        {isDesktop ? <span>Press Start or click to restart</span> : null}
        {! isDesktop ? <span>Tap to restart</span> : null}
      </OverlayBase>
      <OverlayBase show={showReadyCountOverlay}>
        <span>Ready</span>
        <span>{readyCountTimeRegressive}</span>
      </OverlayBase>
      <OverlayBase show={isPaused}>Paused</OverlayBase>
    </>
  );
};

export default Overlays;