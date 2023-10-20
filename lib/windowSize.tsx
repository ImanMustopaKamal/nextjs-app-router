"use client";
import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  const updateSize = () => {
    if (typeof window !== undefined) {
      setSize([window.innerWidth, window.innerHeight]);
    }
  };
  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("resize", updateSize);
      updateSize();
    }
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default useWindowSize;
