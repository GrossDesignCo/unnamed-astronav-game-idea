import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { MenuButton } from '../components/menu-button';
import { play } from '../engine/play';
import { systemSaturnAndMoons } from '../data/planets-and-moons';

const config = {
  initialDt: 0.001,
};

export default function Saturn() {
  const canvas = useRef();

  useEffect(() => {
    if (canvas.current) {
      return play(canvas.current, systemSaturnAndMoons, config);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Saturn & Moons</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="caption">
          <p>Saturn & Moons</p>

          <MenuButton href="/">Main</MenuButton>
        </div>

        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
}
