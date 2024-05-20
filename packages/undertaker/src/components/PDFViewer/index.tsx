/* eslint-disable react/jsx-no-undef */
import React from "react";
import workUrl from "pdfjs-dist/build/pdf.worker.js";
import { Worker } from "@react-pdf-viewer/core";
import { default as PDFViewer, type PDFViewerProps } from "./PDFViewer";
import "./style.less";

export default function Viewer(props: PDFViewerProps) {
  return (
    <Worker workerUrl={workUrl}>
      <PDFViewer {...props} />
    </Worker>
  );
}
