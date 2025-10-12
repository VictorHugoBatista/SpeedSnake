export const randomInSteps = (min, max, step) => {
  const numberOfSteps = Math.floor((max - min) / step);
  const randomStepIndex = Math.floor(Math.random() * (numberOfSteps + 1));
  const randomNumber = min + (randomStepIndex * step);

  return randomNumber;
}
