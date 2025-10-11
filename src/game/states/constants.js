export const stepSizePercent = 5;
export const gameAreaMinPositionPercent = 0;
export const gameAreaMaxPositionPercent = 100 - stepSizePercent;

export const iterationTimeInMilliseconds = 500;
export const readyCountTimeInMilliseconds = 3000;

export const notAllowedDirectionChanges = {
  RIGHT: "LEFT",
  LEFT: "RIGHT",
  UP: "DOWN",
  DOWN: "UP",
};

export const initialSnakeParts = [
  {
    x: 50,
    y: 50,
    size: stepSizePercent,
    type: "snake",
  },
  {
    x: 50 - stepSizePercent,
    y: 50,
    size: stepSizePercent,
    type: "snake",
  },
  {
    x: 50 - stepSizePercent * 2,
    y: 50,
    size: stepSizePercent,
    type: "snake",
  },
  {
    x: 50 - stepSizePercent * 3,
    y: 50,
    size: stepSizePercent,
    type: "snake",
  },
  {
    x: 50 - stepSizePercent * 4,
    y: 50,
    size: stepSizePercent,
    type: "snake",
  },
];
