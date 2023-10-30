import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import styled from 'styled-components';
import { Upload as UploadIcon } from '@icon-park/react';
import COLOR_MAP from '@/styles/colors';
import { BASE_URL } from '@/configs';

const Box = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  // background-color: ${COLOR_MAP.white3};
  min-height: 80px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${COLOR_MAP.primary};
  height: 100%;
  border-radius: 5px;
  z-index: 1;
`;

const Pre = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
  }
`;

const T = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  span {
    margin-left: 4px;
  }
`;

export interface UploadProps {
  url?: string;
  allowExtensions?: string[];
  onChange?(file: File): void;
  onFinish?(data: UploadData): void;
  onFailed?(): void;
  defaultImage?: string;
}

export type UploadData = {
  filename: string;
  origin: string;
  url: string;
  ext?: string;
  width?: number;
  height?: number;
};

export function Upload(props: UploadProps) :React.ReactElement {
  const { url, onFinish, onFailed, allowExtensions, defaultImage } = props;
  const [status, setStatus] = React.useState(null);
  const [width, setWidth] = React.useState<number | string>(0);
  const [result, setResult] = React.useState(null);

  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const SUCCESS = '上传成功';

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
      setWidth(0);
      setStatus(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0] as File;
    const n = file?.name.split('.').pop();
    
    if (!allowExtensions?.includes(n)) {
      setWidth('100%');
      setStatus('不支持的格式');
      return;
    }

    const formdata = new FormData();
    formdata.append('file', file);
    (async() => {
      const config: AxiosRequestConfig = {
        method: 'post',
        data: formdata,
        url: url,
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        onUploadProgress(progressEvent) {
          const per = Number((progressEvent.loaded / progressEvent.total).toFixed(1));
          if (ref.current) {
            setWidth(ref.current.offsetWidth * per);
          }
        },
      };
      const resp = await axios(config);
      if (resp.data.code === 0) {
        setStatus(SUCCESS);
        if (onFinish) {
          onFinish(resp.data.data);
          setResult(resp.data.data);
        }
      } else {
        setStatus('上传失败');
        if (onFailed) onFailed();
      }
    })();
  };

  const MASK_COLOR =
    status === null
      ? COLOR_MAP.green
      : (status === SUCCESS ? 'transparent' : COLOR_MAP.red);

  const BOX_BORDRE_COLOR =
    status === null
      ? COLOR_MAP.primary
      : (status === SUCCESS ? COLOR_MAP.green : COLOR_MAP.red);

  return (
    <Box
      className='component-upload'
      ref={ref}
      onClick={handleClick}
      style={{borderColor: BOX_BORDRE_COLOR}}
    >
      <input
        type='file'
        onChange={handleChange}
        style={{width: 1, height: 1, position: 'absolute'}}
        ref={inputRef}
      />
      {
        (status === SUCCESS) || defaultImage
          ? <Preview url={result?.url || defaultImage} title={result?.filename} />
          :
          <>
            <Mask style={{width: width, backgroundColor: MASK_COLOR}} />
            <UploadText txt={status} />
          </>
      }
    </Box>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Preview = ({url, title}: {url: string; title?: string}) => (
  <Pre
    className='preview'
    title='点击更换图片'
  >
    <img src={BASE_URL + url} alt={title || 'pic'} />
  </Pre>
);

const UploadText = ({txt}: {txt?: string}) => (
  <T>
    {
      txt
        ? <span style={{color: COLOR_MAP.white2}}>{ txt }</span>
        : <><UploadIcon theme="outline" size="24" fill="#333"/><span>点击上传</span></>
    }
  </T>
);
