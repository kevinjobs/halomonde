import React from "react";
import dayjs from "dayjs";
import { FaRegCalendarTimes } from "react-icons/fa";

export interface Work {
  summary: string;
  details: string;
  start: Date;
  end: Date;
}

export interface WorkCardProps {
  title: string;
  works: Work[];
}

export default function WorkCard({ title, works }: WorkCardProps) {
  return (
    <div className="work-card">
      <div className="work-card__header">
        <span>{title}</span>
        <div className="work-card__header--line"></div>
      </div>
      <div className="work-card__body">
        {works.map((work) => (
          <WorkItem work={work} key={work.summary} />
        ))}
      </div>
    </div>
  );
}

function WorkItem({ work }: { work: Work }) {
  const totals = dayjs(work.start).diff(work.end, "day");
  const spent = dayjs(work.start).diff(dayjs(), "day");
  const percent = (spent / totals) * 100 > 100 ? 100 : (spent / totals) * 100;

  return (
    <div className="work-card__item">
      <div className="work-card__item--progress">
        <div
          className="work-card__item--progress__mask"
          style={{ width: `${percent}%` }}
        ></div>
        <div
          className="work-card__item--progress__mask-2"
          style={{ width: `${100 - percent}%` }}
        ></div>
      </div>
      <div className="work-card__item--summary">{work.summary}</div>
      <div className="work-card__item--end">
        <FaRegCalendarTimes />
        <span>{dayjs(work.end).format("YYYY年M月D日")}</span>
      </div>
    </div>
  );
}
