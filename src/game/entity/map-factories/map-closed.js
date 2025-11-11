import MapPart from "../map-part";

export const createMapClosed = (isDesktop, partSize) => {
  if (! isDesktop) {
    return [new MapPart(partSize, 0, 0)];
  }

  return [new MapPart(partSize, 5, 5)];
};
