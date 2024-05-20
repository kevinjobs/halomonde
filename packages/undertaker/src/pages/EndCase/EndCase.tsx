import React from "react";
import { Select, InputNumber } from "antd";
import { Table, Button } from "@horen/core";

export default function EndCasePage() {
  const now = new Date();
  const thisYear = now.getFullYear();

  const data = {
    head: ["状态", "案号", "案由", "当事人", "调解员", "操作"],
    body: [],
  };

  return (
    <div className="page page-end-case">
      <Select
        defaultValue={thisYear}
        options={[
          {
            value: thisYear + 1,
            label: thisYear + 1,
          },
          {
            value: thisYear,
            label: thisYear,
          },
          {
            value: thisYear - 1,
            label: thisYear - 1,
          },
          {
            value: thisYear - 2,
            label: thisYear - 2,
          },
        ]}
      />
      <Select
        defaultValue={"mediate"}
        options={[
          {
            value: "mediate",
            label: "诉前调",
          },
        ]}
      />
      <InputNumber />
      <Button>查找案件</Button>
      <Table data={data} />
    </div>
  );
}
