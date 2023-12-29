import React from "react";
import { Button, ButtonProps } from "./button";

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
        <svg fill="#fff" width={20} height={20} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg>
      </div>
    </Button>
  )
}