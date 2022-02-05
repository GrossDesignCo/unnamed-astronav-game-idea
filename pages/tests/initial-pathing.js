import Head from 'next/head';
import { MenuButton } from '../../components/menu-button';
import { useEffect, useRef } from 'react';
import { initialPathing } from '../../engine/tests';

export default function Home() {
  const canvas = useRef();

  useEffect(() => {
    if (canvas.current) {
      initialPathing(canvas.current);
    }
  }, [canvas.current]);

  return (
    <div>
      <Head>
        <title>Test | Path Prediction</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="caption">
          <p>Path Prediction</p>

          <MenuButton href="/">Main</MenuButton>
        </div>

        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
}
