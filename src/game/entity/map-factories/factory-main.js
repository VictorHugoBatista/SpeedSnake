import {createMapOpen} from "./map-open";
import {createMapClosed} from "./map-closed";

import {MapType} from "../../enums/map-type";

export default class FactoryMain {
  static maps = {
    [MapType.OPEN]: createMapOpen,
    [MapType.CLOSED]: createMapClosed,
  };

  createMap(mapType, isDesktop, partSize) {
    return FactoryMain.maps[mapType](isDesktop, partSize);
  }
}
