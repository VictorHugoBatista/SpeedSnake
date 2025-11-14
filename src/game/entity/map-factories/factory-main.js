import {createMapClosed} from "./map-closed";
import {createMapCorridor} from "./map-corridor";
import {createMapOpen} from "./map-open";

import {MapType} from "../../enums/map-type";

export default class FactoryMain {
  static maps = {
    [MapType.OPEN]: createMapOpen,
    [MapType.CORRIDOR]: createMapCorridor,
    [MapType.CLOSED]: createMapClosed,
  };

  createMap(mapType, isDesktop, partSize) {
    return FactoryMain.maps[mapType](isDesktop, partSize);
  }
}
