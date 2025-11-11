import { useGameStore } from "../../states/main";

import useIsDesktop from "../../../hooks/isDesktop";

import { Difficulty } from "../../enums/difficulty"
import { Map } from "../../enums/map"

import RadioButtons from "../../../components/forms/RadioButtons";
import OverlayBase from "./OverlayBase";

const difficulties = [
  { label: "Fast", value: Difficulty.FAST },
  { label: "Faster", value: Difficulty.FASTER },
  { label: "Fastest", value: Difficulty.FASTEST },
  { label: "Lightspeed", value: Difficulty.SPEEDOFLIGHT },
];

const maps = [
  { label: "Open space", value: Map.OPEN },
  { label: "Box", value: Map.CLOSED },
];

const GameStartOverlay = function () {
  // Hooks.
  const isDesktop = useIsDesktop();

  // Game states.
  const showStartOverlay = useGameStore(state => state.showStartOverlay);
  const difficulty = useGameStore(state => state.difficulty);
  const map = useGameStore(state => state.map);

  // Game state methods.
  const startReadyCount = useGameStore(state => state.startReadyCount);
  const setDifficulty = useGameStore(state => state.setDifficulty);
  const setMap = useGameStore(state => state.setMap);

  return (
    <OverlayBase show={showStartOverlay}>
      <div className="overlay-row">
        <div className="overlay-column">
          <div className="overlay-column-title">Difficulty</div>
          <RadioButtons groupName="difficulty" buttons={difficulties} value={difficulty} onChange={(newValue) => setDifficulty(newValue)} />
        </div>
        <div className="overlay-column">
          <div className="overlay-column-title">Map</div>
          <RadioButtons groupName="map" buttons={maps} value={map} onChange={(newValue) => setMap(newValue)} />
          <span>More maps soon</span>
        </div>
      </div>
      <div>
        <span className="game-area-button" onClick={() => startReadyCount()}>
          {isDesktop ? <span>Click here to start</span> : null}
          {! isDesktop ? <span>Tap to start</span> : null}
        </span>
      </div>
    </OverlayBase>
  );
};

export default GameStartOverlay;
