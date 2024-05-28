import "./app.less";

import React, { useState } from "react";

import Header from "@components/Header";
import UserCard from "@components/UserCard";
import Work from "@components/Work";

import { Button, Modal } from "@horen/core";

import wallpaper from "./wallpaper.jpg";

function App() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div className="foxos" style={{ backgroundImage: `url(${wallpaper})` }}>
      <div className="foxos-header">
        <Header
          onClickAvatar={(name) => {
            setVisible(true);
            setUsername(name);
          }}
        />
      </div>
      <div className="foxos-container">
        <div className="top"></div>
        <div className="center">
          <Work />
        </div>
        <div className="status-bar"></div>
      </div>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <Modal.Content>
          <UserCard name={username} />
          <div>
            <Button variant="danger">Logout</Button>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default App;
