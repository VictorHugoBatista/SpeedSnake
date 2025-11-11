import MapPart from "../map-part";

export const createMapClosed = (partSize) => {
  return [new MapPart(partSize, 1, 1)];
};
