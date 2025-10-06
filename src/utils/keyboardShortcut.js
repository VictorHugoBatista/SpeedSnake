import { useEffect } from "react";

const useKeyboardShortcut = function ({
  key,
  onKeyPressed
}) {
  useEffect(() => {
    function keyDownHandler(e) {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        onKeyPressed();
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
}

export default useKeyboardShortcut;
