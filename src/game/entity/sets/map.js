import FactoryMain from "../map-factories/factory-main";

export default class Map {
  constructor() {
    this.parts = [];
    this._factory = new FactoryMain();
  }

  initializeMap(mapType, isDesktop, partSize) {
    this.parts = this._factory.createMap(mapType, isDesktop, partSize);
  }
}

export const objectToMap = (map) => (Object.assign(new Map(), map));
