import React from "react";

export function useHover<T extends HTMLElement = HTMLDivElement>() {
  const ref = React.useRef<T>(null);
  const [hovered, setHovered] = React.useState(false);
  
  React.useEffect(() => {
    if (ref.current) {
      ref.current.onmouseenter = () => {
        setHovered(true);
      }
      ref.current.onmouseleave = () => {
        setHovered(false);
      }
    }
  }, [ref.current]);

  return { ref, hovered };
}