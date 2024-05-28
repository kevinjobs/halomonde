import React, { useEffect, useState } from "react";
import { IoRadioButtonOffSharp, IoRadioButtonOn } from "react-icons/io5";

import "./index.less";

export default function HomePage() {
  const [items, setItems] = useState<TodoItemProps[]>(null);

  const handleAddItem = (v: string, level: number) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const its = items ? items : [];

    const newItems = [
      ...its,
      {
        id: date.valueOf(),
        content: v,
        deadline: `${year}-${month}-${day}`,
        level,
        status: "todo",
      },
    ];
    setBoth(newItems);
  };

  const setBoth = (items: TodoItemProps[]) => {
    setItems(items);
    localStorage.setItem("todos", JSON.stringify(items));
  };

  const handleClickItem = (id: number) => {
    setBoth(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === "todo" ? "done" : "todo",
          };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setItems(JSON.parse(todos));
    }
  }, []);

  return (
    <div className="home-page">
      <div className="top">
        <div className="top-left">
          <div className="todos-container">
            {items &&
              items
                .filter((item) => item.level === 1)
                .map((item) => {
                  return (
                    <TodoItem
                      key={item.content + item.deadline}
                      {...item}
                      onClick={handleClickItem}
                    />
                  );
                })}
            <ItemInput onEnter={(v) => handleAddItem(v, 1)} />
          </div>
        </div>
        <div className="top-right">
          <div className="todos-container">
            {items &&
              items
                .filter((item) => item.level === 0)
                .map((item) => {
                  return (
                    <TodoItem
                      key={item.content + item.deadline}
                      {...item}
                      onClick={handleClickItem}
                    />
                  );
                })}
            <ItemInput onEnter={(v) => handleAddItem(v, 0)} />
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-left">
          <div className="todos-container">
            {items &&
              items
                .filter((item) => item.level === 2)
                .map((item) => {
                  return (
                    <TodoItem
                      key={item.content + item.deadline}
                      {...item}
                      onClick={handleClickItem}
                    />
                  );
                })}
            <ItemInput onEnter={(v) => handleAddItem(v, 2)} />
          </div>
        </div>
        <div className="bottom-right">
          <div className="todos-container">
            {items &&
              items
                .filter((item) => item.level === 3)
                .map((item) => {
                  return (
                    <TodoItem
                      key={item.content + item.deadline}
                      {...item}
                      onClick={handleClickItem}
                    />
                  );
                })}
            <ItemInput onEnter={(v) => handleAddItem(v, 3)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export interface TodoItemProps {
  content: string;
  deadline: string;
  level?: number;
  status?: string;
  onClick?: (id: number) => void;
  id: number;
}

function TodoItem({
  content,
  deadline,
  level = 0,
  status = "todo",
  onClick,
  id,
}: TodoItemProps) {
  const levels = ["important", "normal", "later", "low"];
  const cls = "todo-item " + "level-" + levels[level];

  const handleClick = (id: number) => {
    if (onClick) onClick(id);
  };

  return (
    <div className={cls}>
      <div className="todo-icon">
        <div className="todo-icon-inner" onClick={() => handleClick(id)}>
          <div>
            {status === "done" ? (
              <IoRadioButtonOn size={20} />
            ) : (
              <IoRadioButtonOffSharp size={20} />
            )}
          </div>
        </div>
      </div>
      <div className="todo-content">
        <div className="todo-text">{content}</div>
        <div className="todo-time">{deadline}</div>
      </div>
    </div>
  );
}

export interface ItemInputProps {
  onEnter: (v: string) => void;
  defaultValue?: string;
}

function ItemInput({ onEnter, defaultValue = "" }: ItemInputProps) {
  const [v, setV] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setV(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter(v);
      setV("");
    }
  };

  return (
    <div className="todo-item-input">
      <div className="add-icon">
        <div className="add-icon-v"></div>
        <div className="add-icon-h"></div>
      </div>
      <input value={v} onChange={handleChange} onKeyDown={handleKeyDown} />
    </div>
  );
}
