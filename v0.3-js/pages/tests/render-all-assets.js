import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { renderAllAssets } from '../../engine/tests';

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
        <title>Test | Asset Rendering</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="caption">
          <p>Asset Rendering</p>
        </div>
        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
}
