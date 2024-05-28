import React from "react";
import "./style.less";

export default function UserCard({ name }: { name: string }) {
  return (
    <div className="user-card">
      <div className="user-card__header">
        <span>User Profile</span>
      </div>
      <div className="user-card__body">
        <div className="user-card__item">
          <label>Username:</label>
          <span>{name}</span>
        </div>
      </div>
      <div className="user-card__footer"></div>
    </div>
  );
}
