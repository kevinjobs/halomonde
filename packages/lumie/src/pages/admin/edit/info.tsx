import React from 'react';
import { IPost } from "@/types";
import { EditItem } from "./item";
import { Input } from "@/components/input";
import { Option, Select } from '@/components/select';
import { getLocalStorage } from '..';
import DP from 'react-datepicker';
import dayjs from 'dayjs';
import "react-datepicker/dist/react-datepicker.css";

export interface MoreInfoProps {
  state: IPost;
  setValue(e: React.ChangeEvent<HTMLInputElement>): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPostValue(key: string, v: any): void;
}

export function MoreInfo(props: MoreInfoProps) {
  const { state, setValue, setPostValue } = props;

  return (
    <div className="more-info">
      <EditItem name="status" label='状态'>
        <Select onChange={v => setPostValue('status', v)} defaultValue={state?.status}>
          <Option value='publish' name='已发表' />
          <Option value='draft' name='草稿' />
          <Option value='private' name='隐私' />
        </Select>
      </EditItem>

      <EditItem name="type" label='类型'>
        <Select onChange={v => setPostValue('type', v)} defaultValue={state?.type}>
          <Option value='article' name='文章' />
          <Option value='photo' name='照片' />
          <Option value='cover' name='封面' />
          <Option value='avatar' name='头像' />
        </Select>
      </EditItem>

      <EditItem name="author" label="作者">
        <Input
          data-name="author"
          defaultValue={state?.author || getLocalStorage().name}
          onChange={setValue}
        />
      </EditItem>

      <EditItem name="createAt" label="创建">
        <DP
          selected={dayjs.unix(state?.createAt).toDate()}
          onChange={d => setPostValue('createAt', dayjs(d).unix())}
          dateFormat={'yyyy-MM-dd'}
        />
      </EditItem>

      <EditItem name="updateAt" label="更新">
        <DP
          selected={state?.updateAt && dayjs.unix(state?.updateAt).toDate()}
          onChange={d => setPostValue('updateAt', dayjs(d).unix())}
          dateFormat={'yyyy-MM-dd'}
        />
      </EditItem>
      
      <EditItem name='exceprt' label="简介">
        <Input
          data-name="excerpt"
          defaultValue={state?.excerpt}
          onChange={setValue}
        />
      </EditItem>

      <EditItem name="format" label='格式'>
        <Select onChange={v => setPostValue('format', v)} defaultValue={state?.format}>
          <Option value='default' name='默认格式' />
          <Option value='html' name='网页' />
          <Option value='markdown' name='MD文档' />
          <Option value='txt' name='文本' />
          <Option value='jpg' name='图片(JPG)' />
          <Option value='png' name='图片(PNG)' />
          <Option value='jpeg' name='图片(JPEG)' />
          <Option value='gif' name='图片(GIF)' />
        </Select>
      </EditItem>

      <EditItem name="category" label='分类'>
        <Select onChange={v => setPostValue('category', v)} defaultValue={state?.category}>
          <Option value='default' name='默认分类' />
          <Option value='life' name='生活' />
          <Option value='fiction' name='科幻' />
          <Option value='dairy' name='日志' />
          <Option value='travel' name='旅行' />
        </Select>
      </EditItem>

      <EditItem label="标签">
        <Input
          data-name="tags"
          defaultValue={state?.tags}
          onChange={setValue}
        />
      </EditItem>

      <EditItem label="说明">
        <Input
          data-name="description"
          defaultValue={state?.description}
          onChange={setValue}
        />
      </EditItem>

      <EditItem label="EXIF">
        <Input
          data-name="exif"
          defaultValue={state?.exif}
          onChange={setValue}
        />
      </EditItem>
    </div>
  );
}
