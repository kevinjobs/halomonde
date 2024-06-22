import React, { useState } from 'react';
import { ImageUpload } from '@horen/core';
import { notifications } from '@horen/notifications';
import { uploadFile } from '@/utils/apis/file';

export default function UploadImage() {
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = async (file: File) => {
    const resp = await uploadFile(file, (percent) => {
      setProgress(percent);
    });
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
    }
  };

  return (
    <div style={{ width: 400 }}>
      <ImageUpload
        progress={progress}
        onChange={handleChange}
        accept={[]}
        uploadStatus={status}
      />
    </div>
  );
}
