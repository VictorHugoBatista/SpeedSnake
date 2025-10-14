import { Difficulty } from "./enums/difficulty";
import { DirectionEnum } from "./enums/directions.js";

export const gameAreaMinPositionPercent = 0;

export const readyCountTimeInMilliseconds = 3000;

export const notAllowedDirectionChanges = {
  [DirectionEnum.RIGHT]: DirectionEnum.LEFT,
  [DirectionEnum.LEFT]: DirectionEnum.RIGHT,
  [DirectionEnum.UP]: DirectionEnum.DOWN,
  [DirectionEnum.DOWN]: DirectionEnum.UP,
};

export const initialSnakePartsNumber = 6;
export const initialSnakeHeadPosition = {
  x: 50,
  y: 50,
};

export const difficultiesToTimeInMilliseconds = {
  [Difficulty.FAST]: 60,
  [Difficulty.FASTER]: 40,
  [Difficulty.FASTEST]: 20,
  [Difficulty.SPEEDOFLIGHT]: 10,
};

export const mobileDifficultyDifference = 25;
