import {createMapOpen} from "./map-open";
import {createMapClosed} from "./map-closed";

import {Map} from "../../enums/map";

export default class FactoryMain {
  static maps = {
    [Map.OPEN]: createMapOpen,
    [Map.CLOSED]: createMapClosed,
  };

  createMap(mapType, partSize) {
    return FactoryMain.maps[mapType](partSize);
  }
}
