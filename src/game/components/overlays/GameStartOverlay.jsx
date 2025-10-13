import { useGameStore } from "../../states/main";

import useIsDesktop from "../../../hooks/isDesktop";

import OverlayBase from "./OverlayBase";

const GameStartOverlay = function () {
  // Hooks.
  const isDesktop = useIsDesktop();

  // Game states.
  const showStartOverlay = useGameStore(state => state.showStartOverlay);

  // Game state methods.
  const startReadyCount = useGameStore(state => state.startReadyCount);

  return (
    <OverlayBase show={showStartOverlay} onClick={() => startReadyCount()}>
      {isDesktop ? <span>Press Start or click here</span> : null}
      {! isDesktop ? <span>Tap to start</span> : null}
    </OverlayBase>
  );
};

export default GameStartOverlay;
