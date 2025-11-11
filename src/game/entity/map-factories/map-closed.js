import MapPart from "../map-part";

export const createMapClosed = (isDesktop, partSize) => {
  if (! isDesktop) {
    return [new MapPart(0, 0, partSize)];
  }

  return [new MapPart(5, 5, partSize)];
};
