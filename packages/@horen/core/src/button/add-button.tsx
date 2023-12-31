import React from "react";
import { Button, ButtonProps } from "./button";
import { Icon } from "../icon";

export function AddButton(props: ButtonProps) {
  return (
    <Button
      style={{
        padding: 0,
        height: 25,
        width: 25,
        borderRadius: '50%',
      }}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 25,
          width: 25,
        }}
      >
       <Icon name="add" fill="#f1f1f1" />
      </div>
    </Button>
  )
}
