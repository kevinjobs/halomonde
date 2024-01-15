import React from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import HomePage from "@pages/home";
import NotFound from "@pages/not-found";
import TestPage from "@pages/test";

import {
  openNewWindow,
  closeMainWindow,
  minimizeMainWindow,
  maximizeMainWindow,
} from "@api/ipc.api";
import Menu from '@components/menu';
import Breadcrumb from "@components/bread-crumb";
import './index.less';

function App() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').splice(1);
  const items = pathnames.map(p => ({title: p}));

  return (
    <div className="electron-template">
      <div className="title-bar">
        <div className="title">
          <span>{document.title}</span>
          <span>{'[' + location.pathname + ']'}</span>
        </div>
        <div className="minimize_close">
          <div
            id="minimize"
            className="minimize_close_item"
            onClick={() => minimizeMainWindow().then()}
          >-</div>
          <div
            id="maximize"
            className="minimize_close_item"
            onClick={() => maximizeMainWindow().then()}
          >□</div>
          <div
            id="close"
            className="minimize_close_item"
            onClick={() => closeMainWindow().then()}
          >×</div>
        </div>
      </div>
      <div className="left-menu">
        <Menu>
          <Menu.Item title="首页" key={1} to="page/home" />
          <Menu.Item title="测试" key={2} to="page/test" />
          <Menu.Item title="测试路径显示" key={3} to="path/to/bread" />
          <Menu.Item title="设置" key={4} onClick={() => openNewWindow('setting')} />
        </Menu>
      </div>
      <div className="center-main">
        <div className="location-path">
          <div>
            <span><Breadcrumb items={items} /></span>
          </div>
        </div>
        <div className="router-container">
          <Routes>
            <Route element={<HomePage />} path={"/page/home"} />
            <Route element={<TestPage />} path={"/page/test"} />
            <Route element={<NotFound />} path={"*"} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
