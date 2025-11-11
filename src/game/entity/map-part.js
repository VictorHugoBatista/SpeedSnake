import Entity from "./entity";

import { EntityType } from "../enums/entity-type";

export default class MapPart extends Entity {
  constructor(size, x, y) {
    super(size, x, y, EntityType.MAP);
  }
}

export const objectToMapPart = (mapPart) => (Object.assign(new MapPart(), mapPart));
