import React, { useState } from "react";
import dayjs from "dayjs";
import { FaRegCalendarTimes } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { Button, Modal, Tag } from "@horen/core";

export interface Work {
  summary: string;
  details: string;
  start: Date;
  end: Date;
  creator: string;
  members: string[];
}

export interface WorkCardProps {
  title: string;
  works: Work[];
}

export default function WorkCard({ title, works }: WorkCardProps) {
  return (
    <div className="work-card">
      <div className="work-card__header">
        <span>
          <span>{title}</span>
          <div className="work-card__header--line"></div>
        </span>
        <span>
          <LuMenu size={28} />
        </span>
      </div>
      <div className="work-card__body perfect-scrollbar">
        {works.map((work) => (
          <WorkItem work={work} key={work.summary} />
        ))}
      </div>
    </div>
  );
}

function WorkDetail({ work }: { work: Work }) {
  return (
    <div className="work-card__modal">
      <div className="work-card__modal--summary work-card__modal--item">
        <div>任务简介</div>
        <span>{work.summary}</span>
      </div>
      <div className="work-card__modal--details work-card__modal--item">
        <div>任务详情</div>
        <span>{work.details}</span>
      </div>
      <div className="work-card__modal--start work-card__modal--item">
        <div>创建时间</div>
        <span>{dayjs(work.start).format("YYYY-MM-DD HH:mm:ss")}</span>
      </div>
      <div className="work-card__modal--end work-card__modal--item">
        <div>截止时间</div>
        <span>{dayjs(work.end).format("YYYY-MM-DD HH:mm:ss")}</span>
      </div>
      <div className="work-card__modal--members work-card__modal--item">
        <div>分配人员</div>
        <span>
          {work.members?.map((member) => (
            <Tag key={member} variant="success">
              {member}
            </Tag>
          ))}
        </span>
      </div>
      <div className="work-card__modal--creator work-card__modal--item">
        <div>任务创建者</div>
        <span>{work.creator}</span>
      </div>
    </div>
  );
}

function WorkItem({
  work,
  onClick,
}: {
  work: Work;
  onClick?: (work: Work) => void;
}) {
  const [visible, setVisible] = useState(false);

  const totals = dayjs(work.start).diff(work.end, "day");
  const spent = dayjs(work.start).diff(dayjs(), "day");
  const percent = (spent / totals) * 100 > 100 ? 100 : (spent / totals) * 100;
  const isToday = dayjs(work.end).isSame(dayjs(), "day");
  const isBefore = dayjs(work.end).isBefore(dayjs(), "day");

  const cls =
    "work-card__item" +
    (isBefore ? " overtime" : "") +
    (isToday ? " today" : "");

  const handleClick = () => {
    setVisible(true);
    onClick && onClick(work);
  };

  return (
    <div className={cls} onClick={handleClick}>
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
      <Modal
        visible={visible}
        onClose={(e) => {
          e.stopPropagation();
          setVisible(false);
        }}
        style={{ width: 600, maxWidth: 600 }}
      >
        <Modal.Header>
          <h2>任务详情</h2>
        </Modal.Header>
        <Modal.Content>
          <WorkDetail work={work} />
          <div>
            <Button>完成</Button>
            <Button variant="danger">删除任务</Button>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}
