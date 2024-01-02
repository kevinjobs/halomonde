import React from 'react';
import Link from 'next/link';

export default function Component() {
  return (
    <div>
      <h1>components</h1>
      <div><Link href={'/components/button'}>Button</Link></div>
      <div><Link href={'/components/icon'}>Icon</Link></div>
      <div><Link href={'/components/input'}>Input</Link></div>
      <div><Link href={'/components/modal'}>Modal</Link></div>
      <div><Link href={'/components/slider'}>Slider</Link></div>
      <div><Link href={'/components/switch'}>Switch</Link></div>
      <div><Link href={'/components/tag'}>Tag</Link></div>
      <div><Link href={'/components/upload'}>Upload</Link></div>
      <h1>Hooks</h1>
      <div><Link href={'/hooks/use-form'}>useForm</Link></div>
      <div><Link href={'/hooks/use-hover'}>useHover</Link></div>
      <div><Link href={'/hooks/use-set-state'}>useSetState</Link></div>
      <div><Link href={'/hooks/use-toggle'}>useToggle</Link></div>
      <div><Link href={'/hooks/use-move'}>useMove</Link></div>
    </div>
  )
}