import { objectToEntity } from "../forms/entity";

export default class GameArea {
  entities = [];

  // Get entity colliding to the entity paremeter's position.
  // Used on the step and the new food positioning logics.
  // @see checkCollision()
  // @see generateNewFoodLocation()
  getCollisionEntitiy(entityToCompare) {
    const collisionArray = this.entities.filter(entityObject => {
      const entity = objectToEntity(entityObject);
      return entity.isPositionInside(entityToCompare.x, entityToCompare.y);
    });

    if (! collisionArray.length) {
      return false;
    }

    const [ collision ] = collisionArray;

    return collision;
  }

  // Calculates the actual rendering sizing and positioning
  // and pass the data to a callback function, just like
  // the array map function.
  // Used by the game state component.
  // @see Stage (component)
  renderMap(dimensions, callback) {
    return this.entities.map((entity, key) => {
      const renderObject = {
          key: key,
          x: (entity.x / 100) * dimensions.width,
          y: (entity.y / 100) * dimensions.height,
          width: (entity.sizeX / 100) * dimensions.width,
          height: (entity.sizeY / 100) * dimensions.height,
      };
      return callback(renderObject);
    });
  }

  // Clear and push the new entitites to the gameArea.
  // Called by the update game area logic.
  // @see updateGameArea()
  update(entitiesToRender) {
    this._clear();
    this._push(entitiesToRender);
  }

  _push(entitiesToRender) {
    this.entities.push(...entitiesToRender);
  }

  _clear() {
    this.entities = [];
  }
}

export const objectToGameArea = (gameAreaObject) => (Object.assign(new GameArea(), gameAreaObject));
