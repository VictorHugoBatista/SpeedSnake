import { useEffect } from "react";

const useKeyboardShortcut = function ({
  keys,
  onKeyPressed
}) {
  useEffect(() => {
    function keyDownHandler(e) {
      if (keys.includes(e.key.toLowerCase())) {
        e.preventDefault();
        onKeyPressed();
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keys, onKeyPressed]);
}

export default useKeyboardShortcut;
