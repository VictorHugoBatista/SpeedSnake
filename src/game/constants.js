import { DirectionEnum } from "./enums/directions.js";

// @todo Turn this constants states and fill with data based on if os mobile or desktop.
export const gameEntitySizePercent = 5;
export const gameAreaMinPositionPercent = 0;
export const gameAreaMaxPositionPercent = 100 - gameEntitySizePercent;

export const iterationTimeInMilliseconds = 50;
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
