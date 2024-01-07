import { useCallback, useEffect, useState } from "react";
import { useWindowEvent } from "../use-window-event";

export function useViewport() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const setSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth || 0,
      height: window.innerHeight || 0
    })
  }, []);

  useWindowEvent('resize', setSize, {passive: false});
  useWindowEvent('orientationchange', setSize, {passive: false});
  useEffect(setSize, []);

  return windowSize;
}