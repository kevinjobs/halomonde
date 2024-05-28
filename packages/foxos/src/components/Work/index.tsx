import React from "react";
import lodash from "lodash";
import WorkCard, { Work } from "./WorkCard";
import "./style.less";

export default function MyWork() {
  const works = [
    {
      summary: "报送调研文章",
      details: "this is a test Task",
      start: new Date("2024-05-10"),
      end: new Date("2024-05-20"),
    },
    {
      summary: "报送调研文章报送调研文章报送调研文章报送调研文章报送调研文章",
      details: "this is a test Taskddddd",
      start: new Date("2024-05-10"),
      end: new Date("2024-06-20"),
    },
    {
      summary: "完成文书补录工作",
      details: "this is a test Task",
      start: new Date("2024-05-10"),
      end: new Date("2024-6-3"),
    },
    {
      summary: "文书上网",
      details: "this is a test Task",
      start: new Date("2024-05-10"),
      end: new Date("2024-08-11"),
    },
  ];
  return (
    <div className="component-mywork">
      <WorkCard
        title="My Day"
        works={lodash.sortBy(works, (o: Work) => o.end)}
      />
    </div>
  );
}
