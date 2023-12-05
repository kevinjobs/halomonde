import React from 'react';
import Link from 'next/link';

export default function Component() {
  return (
    <div>
      <h1>components</h1>
      <div><Link href={'/components/slider'}>Slider</Link></div>
      <div><Link href={'/components/tag'}>Tag</Link></div>
    </div>
  )
}