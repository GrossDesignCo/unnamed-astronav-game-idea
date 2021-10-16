import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { play } from '../engine/play';
import { saturnAndMoons } from '../data/planets-and-moons';

export default function Saturn() {
  const canvas = useRef();

  useEffect(() => {
    if (canvas.current) {
      play(canvas, saturnAndMoons);
    }
  }, [canvas.current]);

  return (
    <div>
      <Head>
        <title>Saturn and Moons</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
}
