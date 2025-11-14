import MapPart from "../map-part";

import {createMapClosed} from "./map-closed";

export const createMapPrision = (isDesktop, partSize) => {
  const multiplier = 2;
  const mapPartSize = partSize * multiplier;

  const outerWalls = createMapClosed(isDesktop, partSize * multiplier);

  return [
    ...outerWalls,
  ];
};
