import { useEffect } from "react";

const useKeyPress = (buttonRef) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ð") {
        event.preventDefault();
        buttonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

export default useKeyPress;
