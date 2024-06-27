import { Input } from '@horen/core';
import React, { useState } from 'react';

export default function Hello() {
  const [value, setValue] = useState('');
  const [rawValue, setRawValue] = useState<string | number>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string | number,
  ) => {
    setValue(e.target.value);
    setRawValue(value);
  };

  return (
    <div>
      <div>
        <div>
          <span style={{ marginRight: 8 }}>Text</span>
          <Input value={value} onChange={handleChange} />
        </div>
        <div>
          <span>raw value: </span>
          <span>{rawValue}</span>
        </div>
      </div>
    </div>
  );
}
