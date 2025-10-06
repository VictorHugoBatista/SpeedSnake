import {create} from "zustand";

import { constants } from "./constants";

export const useGameStore = create(set => ({
  gameArea: [
    {
      x: 50,
      y: 50,
      size: constants.stepSizePercent,
    },
    {
      x: 50 - constants.stepSizePercent,
      y: 50,
      size: constants.stepSizePercent,
    },
    {
      x: 50 - constants.stepSizePercent * 2,
      y: 50,
      size: constants.stepSizePercent,
    },
    {
      x: 50 - constants.stepSizePercent * 3,
      y: 50,
      size: constants.stepSizePercent,
    },
    {
      x: 50 - constants.stepSizePercent * 4,
      y: 50,
      size: constants.stepSizePercent,
    },
  ],
  addItem: item => (set((state) => {
    const gameAreaToApdate = state.gameArea.slice(0);
    item.size = constants.stepSizePercent;
    gameAreaToApdate.push(({gameArea: item}));
    return {gameArea: gameAreaToApdate};
  })),
}));
