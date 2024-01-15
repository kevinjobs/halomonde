import React from "react";
import { useSelector } from "react-redux";
import { selectCount } from "@store/slices/couter.slice";

export default function HomePage() {
  const count = useSelector(selectCount);
  return (
    <div className={"page-home"}>
      <p>来自 redux 的 count: {count}，在其他界面更改这个数字全局都同步更新</p>
    </div>
  )
}