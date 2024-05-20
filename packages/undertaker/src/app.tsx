import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import AppealPage from "@pages/appeal";
import DossierPage from "@pages/dossier";
import EndCasePage from "@pages/EndCase";
import Menu from "@components/menu";

import "./app.less";

function App() {
  return (
    <div className="work-forge">
      <div className="menu-area">
        <div className="menu-content">
          <Menu>
            <Menu.Item title="Todo's" key="todo-page" to="/" />
            <Menu.Item title="Setting" key="setting-page" />
            <Menu.Item title="电子卷宗" key="dossier-page" to="dossier" />
            <Menu.Item title="上诉移送" key="appeal-page" to="appeal" />
            <Menu.Item title="一键报结" key="end-case-page" to="end-case" />
          </Menu>
        </div>
      </div>
      <div className="page-area">
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/appeal" element={<AppealPage />} />
            <Route path="/dossier" element={<DossierPage />} />
            <Route path="/end-case" element={<EndCasePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
