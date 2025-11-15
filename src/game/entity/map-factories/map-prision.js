import MapPart from "../map-part";

import {createMapClosed} from "./map-closed";

export const createMapPrision = (isDesktop, partSize) => {
  const multiplier = isDesktop ? 2 : 1;
  const mapPartSize = partSize * multiplier;

  const outerWalls = createMapClosed(isDesktop, partSize * multiplier);

  const desktopBars = [
    new MapPart(mapPartSize * 4, mapPartSize, mapPartSize, mapPartSize * 5),
    new MapPart(mapPartSize * 4, mapPartSize * 7, mapPartSize, 100 - mapPartSize),
    new MapPart(mapPartSize * 15, mapPartSize, mapPartSize, mapPartSize * 12),
    new MapPart(mapPartSize * 15, mapPartSize * 14, mapPartSize, 100 - mapPartSize),
  ];

  const mobileBars = [
    new MapPart(mapPartSize * 6, mapPartSize, mapPartSize, mapPartSize * 8),
    new MapPart(mapPartSize * 6, mapPartSize * 11, mapPartSize, 100 - mapPartSize),
    new MapPart(mapPartSize * 13, mapPartSize, mapPartSize, mapPartSize * 8),
    new MapPart(mapPartSize * 13, mapPartSize * 11, mapPartSize, 100 - mapPartSize),
  ];

  return [
    ...outerWalls,
    ...(isDesktop ? desktopBars : mobileBars),
  ];
};
