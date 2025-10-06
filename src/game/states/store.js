import {create} from "zustand";

import { constants } from "./constants";

export const useGameStore = create(set => ({
  gameArea: [{
    x: 10,
    y: 10,
    size: constants.stepSizePercent,
  },
  {
    x: 50,
    y: 50,
    size: constants.stepSizePercent,
  },
  {
    x: 60,
    y: 80,
    size: constants.stepSizePercent,
  }],
  addItem: item => (set((state) => {
    const gameAreaToApdate = state.gameArea.slice(0);
    gameAreaToApdate.push(({gameArea: item}));
    return {gameArea: gameAreaToApdate};
  })),
}));
