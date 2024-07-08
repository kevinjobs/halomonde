import { Input } from '@horen/core';
import React, { useState } from 'react';

export default function Hello() {
  const [value, setValue] = useState('');

  const handleChange = (
    value: string | number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Input value={value} onChange={handleChange} label="Left Label" />
      <br />
      <Input
        value={value}
        onChange={handleChange}
        label="Top Label"
        labelPlacement="top"
      />
      <br />
      <Input
        value={value}
        onChange={handleChange}
        label="Top Label"
        labelPlacement="top"
        required
      />
    </div>
  );
}
