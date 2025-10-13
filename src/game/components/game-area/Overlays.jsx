import { useGameStore } from "../../states/main";

import useIsDesktop from "../../../hooks/isDesktop";

import OverlayBase from "../overlays/OverlayBase";
import GameStartOverlay from "../overlays/GameStartOverlay";

const Overlays = function () {
  // Hooks.
  const isDesktop = useIsDesktop();

  // Game states.
  const isPaused = useGameStore(state => state.isPaused);
  const showEndOverlay = useGameStore(state => state.showEndOverlay);
  const showReadyCountOverlay = useGameStore(state => state.showReadyCountOverlay);
  const readyCountTimeRegressive = useGameStore(state => state.readyCountTimeRegressive);

  // Game state methods.
  const openStartOverlay = useGameStore(state => state.openStartOverlay);

  return (
    <>
      <GameStartOverlay />
      <OverlayBase show={showEndOverlay} onClick={() => openStartOverlay()}>
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