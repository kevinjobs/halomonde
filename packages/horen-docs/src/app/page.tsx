'use client'

import styles from './page.module.css'
import { useMove } from 'horen-hooks';

export default function Home() {
  const { ref } = useMove<HTMLDivElement>({
    onMove(p) {
      console.log(p);
    },
  });

  return (
    <main className={styles.main}>
      <div className='test' ref={ref} style={{width: 200, height: 150, background: '#fff'}}></div>
    </main>
  )
}
