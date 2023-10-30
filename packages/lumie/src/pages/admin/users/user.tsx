import { IUser } from "@/types";
import React from "react";
import styled from "styled-components";
import { Skeleton } from "@/components/skeleton";
import COLOR_MAP from "@/styles/colors";
import dayjs from "dayjs";
import { BASE_URL } from "@/configs";
import { getLocation } from "@/apis/location";
import {
  Avatar,
  Male,
  Female,
  Local,
  BirthdayCake,
  CodeOne,
  User,
} from "@icon-park/react";

const U = styled.div`
  border: 1px solid ${COLOR_MAP.white6};
  display: flex;
  margin: 8px;
  padding: 4px;
  width: 320px;
  flex-wrap: wrap;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    border-color: ${COLOR_MAP.blue};
  }
  .left {
    .avatar {
      width: 108px;
      height: 108px;
      background-color: ${COLOR_MAP.white3};
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .right {
    margin-left: 8px;
    .component-skeleton {
      margin: 8px 0;
    }
    .nickname {
      margin: 4px 0;
      display: flex;
      align-items: center;
      font-weight: 600;
      color: ${COLOR_MAP.white8};
      #name {
        margin-right: 8px;
      }
      #gender {
        position: relative;
        top: 1px;
      }
    }
    .icon {
      position: relative;
      top: 1px;
      margin-right: 5px;
    }
    .username {
      font-size: 14px;
      margin: 4px 0;
      color: ${COLOR_MAP.white7};
    }
    .uid {
      font-size: 12px;
      margin: 4px 0;
      color: ${COLOR_MAP.white7};
    }
    .birthday {
      font-size: 12px;
      margin: 4px 0;
      color: ${COLOR_MAP.white7};
    }
    .location {
      font-size: 12px;
      margin: 4px 0;
      color: ${COLOR_MAP.white7};
    }
  }
`;

export interface UserProps {
  user: IUser;
  onClick?(u: IUser): void;
}

export function UserInfo({ user, onClick }: UserProps): React.ReactElement {
  const [loc, setLoc] = React.useState(null);

  React.useEffect(() => {
    (async() => {
      const l = user?.location.split(',');
      const data = await getLocation(Number(l[0]), Number(l[1]));
      if (data) setLoc(data.address);
    })();
  }, []);

  return (
    <U onClick={() => onClick(user)}>
      <div className="left">
        <div className="avatar">
          {user.avatar ? (
            <img src={BASE_URL + user.avatar} alt={user.username} />
          ) : (
            <Avatar theme="outline" size="48" fill="#9b9b9b" strokeWidth={1} />
          )}
        </div>
      </div>
      <div className="right">
        <div className="nickname">
          <span id="name">{user.nickname}</span>
          <span id="gender">
            {user.gender === "male" && (
              <Male theme="outline" size="14" fill="#4a90e2" />
            )}
            {user.gender === "female" && (
              <Female theme="outline" size="14" fill="#bd10e0" />
            )}
          </span>
        </div>
        <div className="username">
          <span className="icon">
            <User theme="outline" size="14" />
          </span>
          <span>{user.username}</span>
        </div>
        <div className="uid">
          <span className="icon">
            <CodeOne theme="outline" size="14" />
          </span>
          <span>{user.uid}</span>
        </div>
        <div className="birthday">
          <span className="icon">
            <BirthdayCake theme="outline" size="14" />
          </span>
          <span>
            {user.birthday
              ? dayjs
                .unix(Number(String(user.birthday).slice(0, 10)))
                .format("YYYY-MM-DD")
              : "未知生日"}
          </span>
        </div>
        <div className="location">
          <span className="icon">
            <Local theme="outline" size="14" />
          </span>
          <span>{loc || user.location.slice(0, 20) + '...' || "未知地点"}</span>
        </div>
      </div>
    </U>
  );
}

export function UserSke() {
  return (
    <U>
      <div className="left">
        <Skeleton width={108} height={108} />
      </div>
      <div className="right">
        <Skeleton width={170} height={12} />
        <Skeleton width={40} height={12} />
        <Skeleton width={60} height={12} />
        <Skeleton width={80} height={12} />
        <Skeleton width={100} height={12} />
      </div>
    </U>
  );
}
