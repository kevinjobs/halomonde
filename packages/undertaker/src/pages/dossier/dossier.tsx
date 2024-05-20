import React, { useState } from "react";
import Catalog from "./catalog";
import Preview from "./preview";
import Browser from "./browser";
import ITEMS from "./mocks.json";
import "./style.less";

export default function Dossier() {
  const [selectedNode, setSelectedNode] = useState<string | number | null>(
    null
  );

  return (
    <div className="dossier-page">
      <div className="dossier-catalog">
        <Catalog onSelect={(node) => setSelectedNode(node)} />
      </div>
      <div className="dossier-preview">
        {selectedNode ? (
          <Preview
            item={ITEMS.find((item) => item.key === selectedNode)}
            onClose={() => setSelectedNode(null)}
          />
        ) : (
          <Browser />
        )}
      </div>
    </div>
  );
}
