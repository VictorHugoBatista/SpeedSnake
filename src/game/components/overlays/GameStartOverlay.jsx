import { useGameStore } from "../../states/main";

import useIsDesktop from "../../../hooks/isDesktop";

import RadioButtons from "../../../components/forms/RadioButtons";
import OverlayBase from "./OverlayBase";

const difficulties = [
  { label: "Fast", value: "fast" },
  { label: "Faster", value: "faster" },
  { label: "Fastest", value: "fastest" },
  { label: "Lightspeed", value: "lightspeed" },
];

const GameStartOverlay = function () {
  // Hooks.
  const isDesktop = useIsDesktop();

  // Game states.
  const showStartOverlay = useGameStore(state => state.showStartOverlay);

  // Game state methods.
  const startReadyCount = useGameStore(state => state.startReadyCount);

  return (
    <OverlayBase show={showStartOverlay}>
      <div>
        <div className="overlay-column">
          <div className="overlay-column-title">Select difficulty</div>
          <RadioButtons buttons={difficulties} />
        </div>
      </div>
      <div onClick={() => startReadyCount()}>
        {isDesktop ? <span>Press Start or click here</span> : null}
        {! isDesktop ? <span>Tap to start</span> : null}
      </div>
    </OverlayBase>
  );
};

export default GameStartOverlay;
