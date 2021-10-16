import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { play } from '../engine/play';
import { earthAndMoon } from '../data/planets-and-moons';

export default function Earth() {
  const canvas = useRef();

  // TODO: when we start, we want a fresh copy of the objects
  useEffect(() => {
    if (canvas.current) {
      play(canvas, earthAndMoon);
    }
  }, [canvas.current]);

  return (
    <div>
      <Head>
        <title>Earth and Moon</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
}
