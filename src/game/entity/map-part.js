import Rectangle from "./forms/rectangle";

import { EntityType } from "../enums/entity-type";

export default class MapPart extends Rectangle {
  constructor(x, y, sizeX, sizeY) {
    super(x, y, sizeX, sizeY, EntityType.MAP);
  }
}

export const objectToMapPart = (mapPart) => (Object.assign(new MapPart(), mapPart));
