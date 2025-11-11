import FactoryMain from "./map-factories/factory-main";

export default class Map {
  constructor() {
    this.parts = [];
    this.factory = new FactoryMain();
  }

  initializeMap(mapType, partSize) {
    this.parts = this.factory.createMap(mapType, partSize);
  }
}

export const objectToMap = (map) => (Object.assign(new Map(), map));
