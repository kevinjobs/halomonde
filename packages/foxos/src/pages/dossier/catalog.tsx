import React from "react";
import { Tree, TreeDataNode } from "antd";
import { CarryOutOutlined } from "@ant-design/icons";
import ITEMS from "./mocks.json";

function transferTreeDate() {
  const arr = [];

  for (let i = 0; i < ITEMS.length; i++) {
    const key = ITEMS[i].key;
    const parts = key.split("-");

    if (parts.length === 1) {
      arr.push({
        title: ITEMS[i].title,
        key: ITEMS[i].key,
        icon: <CarryOutOutlined />,
        children: [],
      });
    }

    if (parts.length === 2) {
      arr.find((item) => {
        if (item.key === parts[0]) {
          item.children.push({
            title: ITEMS[i].title,
            key: ITEMS[i].key,
            icon: <CarryOutOutlined />,
            children: [],
          });
        }
      });
    }

    if (parts.length === 3) {
      const grandParentKey = parts[0];
      const parentKey = parts[0] + "-" + parts[1];
      arr.find((item) => {
        if (item.key === grandParentKey) {
          item.children.find((item) => {
            if (item.key === parentKey) {
              item.children.push({
                title: ITEMS[i].title,
                key: ITEMS[i].key,
                icon: <CarryOutOutlined />,
                children: [],
              });
            }
          });
        }
      });
    }
  }

  console.log(arr);

  return arr;
}

const treeData: TreeDataNode[] = transferTreeDate();

export interface CatalogProps {
  onSelect: (key: string | number) => void;
}

export default function Catalog({ onSelect }: CatalogProps) {
  return (
    <div>
      <Tree
        defaultExpandAll
        draggable={{ icon: false }}
        showLine={true}
        showIcon={true}
        treeData={treeData}
        onSelect={(selectedKeys, info) => {
          onSelect(info.node.key);
        }}
      />
    </div>
  );
}
