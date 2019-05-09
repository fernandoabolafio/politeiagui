import { useEffect } from "react";
import { useLoader } from "./hooks";

const Loader = ({ children }) => {
  const { onInit } = useLoader({});

  useEffect(function fetchInitialAppData() {
    onInit();
  }, []);

  return children;
};

export default Loader;
