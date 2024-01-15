import React from "react";
// only in electron renderer process
import IpcExample from "./ipc.example";
import ApiExample from "./api.example";
import ReduxExample from "@pages/test/redux.example";

export default function TestPage() {
  return (
    <div className="test-page">
      <ApiExample />
      <hr />
      <ReduxExample />
      <hr />
      {/* only in electron renderer process */}
      { window.ipc && <IpcExample /> }
    </div>
  )
}