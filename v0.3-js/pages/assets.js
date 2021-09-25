import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { renderAllAssets } from '../objects/render-all-assets';

export default function Assets() {
  const canvas = useRef();

  useEffect(() => {
    if (canvas.current) {
      renderAllAssets(canvas);
    }
  }, [canvas.current]);

  return (
    <div>
      <Head>
        <title>Assets Overview</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
}
