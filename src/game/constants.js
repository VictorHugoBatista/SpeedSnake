import { DirectionEnum } from "./enums/directions.js";

export const gameAreaMinPositionPercent = 0;

export const readyCountTimeInMilliseconds = 3000;
export const iterationTimeInMilliseconds = 50;

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
