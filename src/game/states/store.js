import {create} from "zustand";

import { constants } from "./constants";

export const useGameStore = create(set => ({
  snake: [
    {
      x: 50,
      y: 50,
      size: constants.stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - constants.stepSizePercent,
      y: 50,
      size: constants.stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - constants.stepSizePercent * 2,
      y: 50,
      size: constants.stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - constants.stepSizePercent * 3,
      y: 50,
      size: constants.stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - constants.stepSizePercent * 4,
      y: 50,
      size: constants.stepSizePercent,
      type: "snake",
    },
  ],
  food: {
    x: 95,
    y: 95,
    size: constants.stepSizePercent,
    type: "snake",
  },
  gameArea: [
  ],
  addSnakeItem: part => (set((state) => {
    const snakeToUpdate = state.snake.slice(0);
    part.size = constants.stepSizePercent;
    snakeToUpdate.push((part));
    return {snake: snakeToUpdate};
  })),
  updateGameArea: () => (set((state) => {
    state.gameArea = state.snake.slice(0);
    state.gameArea.push(state.food);
    return {gameArea: state.gameArea}
  })),
}));
