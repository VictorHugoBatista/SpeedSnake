import MapPart from "../map-part";

const createMapClosed = (partSize) => {
  return [new MapPart(partSize, 1, 1)];
};

export default createMapClosed;
