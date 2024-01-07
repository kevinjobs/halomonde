import React, { useEffect, useState } from "react";
import { Icon } from "@horen/core";
import { Header } from '../_partial/layout';
import { fetchFileList, deleteFileByFilename } from "@/apis";
import { IFile } from "@/types";
import { notifications } from "@horen/notifications";
import './files.css';

export default function AdminFile() {
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [fs, setFs] = useState<IFile[]>([]);

  const fetchFiles = () => {
    (async () => {
      const resp = await fetchFileList({offset});
      if (typeof resp !== 'string') {
        setFs([...fs, ...resp.data.files]);
        if (resp.data.offset + resp.data.limit >= resp.data.totals) {
          setHasMore(false);
        }
      }
      else notifications.show({type: 'error', message: resp});
    })();
  }

  const handleLoad = () => {
    setOffset(offset + 10);
  }

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement>, filename: string) => {
    if (window.confirm('确定删除?')) {
      (async() => {
        const res = await deleteFileByFilename(filename);
        if (typeof res !== 'string') {
          window.alert('删除成功');
          const idx = findIdx(filename, fs);
          const arr = [...fs];
          arr.splice(idx, 1);
          setFs(arr);
        }
        else window.alert(res);
      })();
    }
  }

  useEffect(() => {
    if (hasMore) fetchFiles();
  }, [offset]);

  return (
    <div className="file-list-admin">
      <Header>
        <h2>文件列表</h2>
      </Header>
      <div className="file-list">
        {fs && fs.map(c => {
          return (
            <div className="file-item" key={c.filename+c.origin}>
              <span id='file-preview'>
                <img src={c.url} alt={c.filename} />
                <span
                  id="delete-file"
                  onClick={e => handleDelete(e, c.filename)}
                  data-filename={c.filename}
                >
                  <Icon name="error" />
                </span>
              </span>
            </div>
          )
        })}
        {
          hasMore &&
          <div id="load-more-file" onClick={handleLoad}>加载更多</div>
        }
      </div>
    </div>
  )
}

const findIdx = (filename: string, files: IFile[]) => {
  for (let i=0; i<files.length; i++) {
    if (files[i].filename === filename) return i;
  }
}