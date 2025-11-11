import Square from "./forms/square";

import { EntityType } from "../enums/entity-type";

export default class MapPart extends Square {
  constructor(x, y, size) {
    super(x, y, size, EntityType.MAP);
  }
}

export const objectToMapPart = (mapPart) => (Object.assign(new MapPart(), mapPart));
