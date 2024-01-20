import { Input } from '@horen/core';
import React, { useState } from 'react';

export default function Hello() {
  const [value, setValue] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string | number,
  ) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', width: 300, alignItems: 'center' }}>
        <span style={{ marginRight: 8 }}>Text</span>
        <Input value={value} onChange={handleChange} />
      </div>
    </div>
  );
}
