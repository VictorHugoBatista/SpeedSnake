import MapPart from "../map-part";

export const createMapClosed = (isDesktop, partSize) => {
  return [
    new MapPart(0, 0, partSize, 100),
    new MapPart(partSize, 0, 100 - partSize, partSize),
    new MapPart(100 - partSize, partSize, partSize, 100 - partSize),
    new MapPart(partSize, 100 - partSize, 100 - (partSize * 2), partSize),
  ];
};
