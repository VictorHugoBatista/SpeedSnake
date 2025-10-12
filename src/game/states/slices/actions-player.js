import {
  notAllowedDirectionChanges,
} from "../constants";

export const actionsPlayerSlice = (set) => ({
  // Change the direction. Deny going to the opposite direction.
  changeDirection: newDirection => {
    set((state) => {
      if (notAllowedDirectionChanges[newDirection] === state.direction) {
        return {};
      }

      return {direction: newDirection};
    });
  },
});
