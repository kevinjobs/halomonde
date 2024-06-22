import React from "react";
import lodash from "lodash";
import WorkCard, { Work } from "./WorkCard";
import "./style.less";
import dayjs from "dayjs";

export default function MyWork() {
  const works = [
    {
      summary: "报送调研文章",
      details: "this is a test Task",
      start: new Date("2024-05-10"),
      end: new Date("2024-05-20"),
      creator: "张三",
      members: [
        "张三",
        "李四",
        "王五",
        "赵六",
        "孙七",
        "周八",
        "吴九",
        "郑十",
        "王十一",
        "李十二",
        "张十三",
        "李十四",
        "王十五",
        "赵十六",
        "孙十七",
        "周十八",
        "吴十九",
        "郑二十",
        "王二十一",
      ],
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
    {
      summary: "文书上网",
      details:
        "完成文书上网工作首先要在前面的工作里完成后面的工作并且不忘记之前的工作继续开展之后的工作完成文书上网工作首先要在前面的工作里完成后面的工作并且不忘记之前的工作继续开展之后的工作完成文书上网工作首先要在前面的工作里完成后面的工作并且不忘记之前的工作继续开展之后的工作完成文书上网工作首先要在前面的工作里完成后面的工作并且不忘记之前的工作继续开展之后的工作完成文书上网工作首先要在前面的工作里完成后面的工作并且不忘记之前的工作继续开展之后的工作完成文书上网工作首先要在前面的工作里完成后面的工作并且不忘记之前的工作继续开展之后的工作完成文书上网工作首先要在前面的工作里完成后面的工作并且不忘记之前的工作继续开展之后的工作",
      start: new Date("2024-05-10"),
      end: new Date("2024-05-29"),
    },
    {
      summary: "文书上网",
      details: "this is a test Task",
      start: new Date("2024-05-10"),
      end: new Date("2024-08-11"),
    },
    {
      summary: "文书上网",
      details: "this is a test Task",
      start: new Date("2024-05-10"),
      end: new Date("2024-05-29"),
    },
    {
      summary: "文书上网",
      details: "this is a test Task",
      start: new Date("2024-05-10"),
      end: new Date("2024-08-11"),
    },
    {
      summary: "文书上网",
      details: "this is a test Task",
      start: new Date("2024-05-10"),
      end: new Date("2024-08-11"),
    },
    {
      summary: "文书上网",
      details: "this is a test Task",
      start: new Date("2024-05-10"),
      end: new Date("2024-08-11"),
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
      <div className="component-mywork__myday">
        <WorkCard
          title="Today"
          works={lodash.filter(works, (o: Work) =>
            dayjs(o.end).isSame(dayjs(), "day")
          )}
        />
      </div>
      <div className="component-mywork__lists">
        <WorkCard
          title="Todo List"
          works={lodash.sortBy(works, (o: Work) => o.end)}
        />
      </div>
    </div>
  );
}
