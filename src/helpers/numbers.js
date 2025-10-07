import {
  gameAreaMinPositionPercent,
  gameAreaMaxPositionPercent,
  stepSizePercent,
} from "../game/states/constants";

export const randomInSteps = (min, max, step) => {
  const numberOfSteps = Math.floor((max - min) / step);
  const randomStepIndex = Math.floor(Math.random() * (numberOfSteps + 1));
  const randomNumber = min + (randomStepIndex * step);

  return randomNumber;
}

export const randomStep = () => {
  return randomInSteps(
    gameAreaMinPositionPercent,
    gameAreaMaxPositionPercent,
    stepSizePercent,
  );
}
