import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import PDFViewer from "@components/PDFViewer";
import pdfurl from "@assets/files/sushu.pdf";

export type DossierItem = {
  key: string;
  title: string;
  url: string;
  type?: string;
};

export interface PreviewProps {
  item: DossierItem;
  onClose: () => void;
}

export default function Preview({ item, onClose }: PreviewProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="preview-area">
      <div className="preview-header">
        <h4>{item?.title}</h4>
        <div className="preview-close" onClick={handleClose}>
          <IoCloseOutline size={18} />
        </div>
      </div>
      <div className="preview-body">
        {item?.type === "pdf" && <PDFViewer fileUrl={pdfurl} />}
      </div>
    </div>
  );
}
