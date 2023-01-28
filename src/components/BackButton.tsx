"use client";

import { ClassAttributes, ButtonHTMLAttributes } from "react";

export default function BackButton(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={() => {
        history.back();
      }}
      {...props}
    >
      Go Back
    </button>
  );
}
