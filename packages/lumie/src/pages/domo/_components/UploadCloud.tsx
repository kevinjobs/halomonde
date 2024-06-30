import React, { useState } from 'react';

import { uploadCloudFile } from '@/utils/apis/file';
import { notifications } from '@horen/notifications';
import { ImageUpload } from '@horen/core';
import { photoThumbUrl } from '@/utils/uri';

export interface UploadCloudProps {
  value: string;
  onChange: (url: string, file?: File) => void;
}

export function UploadCloud({ value = '', onChange }: UploadCloudProps) {
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = async (file: File) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp: any = await uploadCloudFile(file, (percent) => {
      setProgress(percent);
    }).catch((err) => {
      notifications.show({
        variant: 'warning',
        message: err,
      });
      setStatus('failed');
    });

    if (!resp) {
      setStatus('failed');
      return;
    }

    if (typeof resp === 'string') {
      notifications.show({
        variant: 'warning',
        message: resp,
      });
      setStatus('failed');
    } else {
      notifications.show({
        variant: 'success',
        message: '上传成功',
      });
      setStatus('success');

      if (resp.Location) {
        onChange('https://' + resp.Location, file);
      }
    }
  };

  return (
    <div>
      <div>
        <ImageUpload
          progress={progress}
          onChange={handleChange}
          accept={[]}
          uploadStatus={status}
          defaultPreviewURL={photoThumbUrl(value)}
        />
      </div>
    </div>
  );
}
