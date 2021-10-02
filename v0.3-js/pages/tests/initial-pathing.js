import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { initialPathing } from '../../engine/tests';

export default function Home() {
  const canvas = useRef();

  useEffect(() => {
    if (canvas.current) {
      initialPathing(canvas);
    }
  }, [canvas.current]);

  return (
    <div>
      <Head>
        <title>Tests</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>Initial Pathing</p>
        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
}
