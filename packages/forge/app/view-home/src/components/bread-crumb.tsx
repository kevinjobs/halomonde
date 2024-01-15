import React from "react";
import './bread-crumb.less';

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
}

export type BreadcrumbItem = {
  title: string;
  href?: string;
}

export default function Breadcrumb({items}: BreadcrumbProps) {
  return (
    <div className="component-breadcrumb">
      {items.map((item) => {
        return (
          <div className="cb-item" key={item.title}>
            <a href={item.href || '#'}>{item.title}</a>
          </div>
        )
      })}
    </div>
  )
}