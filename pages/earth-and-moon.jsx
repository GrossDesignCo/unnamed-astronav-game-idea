import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { MenuButton } from '../components/menu-button';
import { play } from '../engine/play';
import { systemEarthAndMoon } from '../data/planets-and-moons';

const config = {
  initialDt: 0.001,
};

export default function EarthAndMoon() {
  const canvas = useRef();

  // TODO: when we start, we want a fresh copy of the objects
  useEffect(() => {
    if (canvas.current) {
      return play(canvas.current, systemEarthAndMoon, config);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Earth & Moon</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="caption">
          <p>Earth & Moon</p>

          <MenuButton href="/">Main</MenuButton>
        </div>

        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
}
