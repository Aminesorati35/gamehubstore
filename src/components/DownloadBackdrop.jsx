import React from "react";

export default function DownloadBackdrop({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-2xl backdrop-saturate-150"
      aria-hidden="true"
    />
  );
}