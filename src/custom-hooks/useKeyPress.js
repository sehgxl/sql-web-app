import { useEffect } from "react";

const useKeyPress = (handleFunction) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      handleFunction(event);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleFunction]);
};

export default useKeyPress;
