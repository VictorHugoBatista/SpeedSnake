import MapPart from "../map-part";

export const createMapCorridor = (isDesktop, partSize) => {
  const barMultiplier = isDesktop ? 5 : 2;

  return [
    new MapPart(0, 0, 100, partSize * barMultiplier),
    new MapPart(0, 100 - partSize * barMultiplier, 100, partSize * barMultiplier),
  ];
};
