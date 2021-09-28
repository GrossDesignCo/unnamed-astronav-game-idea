import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { playIntro } from '../engine/intro';

export default function Home() {
  const canvas = useRef();

  useEffect(() => {
    if (canvas.current) {
      playIntro(canvas);
    }
  }, [canvas.current]);

  return (
    <div>
      <Head>
        <title>Intro</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
}
