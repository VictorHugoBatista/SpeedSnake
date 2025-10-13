import { useGameStore } from "../../states/main";

import useIsDesktop from "../../../hooks/isDesktop";

import { Difficulty } from "../../enums/difficulty"

import RadioButtons from "../../../components/forms/RadioButtons";
import OverlayBase from "./OverlayBase";

const difficulties = [
  { label: "Fast", value: Difficulty.FAST },
  { label: "Faster", value: Difficulty.FASTER },
  { label: "Fastest", value: Difficulty.FASTEST },
  { label: "Lightspeed", value: Difficulty.SPEEDOFLIGHT },
];

const GameStartOverlay = function () {
  // Hooks.
  const isDesktop = useIsDesktop();

  // Game states.
  const showStartOverlay = useGameStore(state => state.showStartOverlay);
  const difficulty = useGameStore(state => state.difficulty);

  // Game state methods.
  const startReadyCount = useGameStore(state => state.startReadyCount);
  const setDifficulty = useGameStore(state => state.setDifficulty);

  return (
    <OverlayBase show={showStartOverlay}>
      <div>
        <div className="overlay-column">
          <div className="overlay-column-title">Difficulty</div>
          <RadioButtons buttons={difficulties} value={difficulty} onChange={(newValue) => setDifficulty(newValue)} />
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
