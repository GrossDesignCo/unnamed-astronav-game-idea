import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { MenuButton } from '../components/menu-button';
import { play } from '../engine/play';
import { systemEarthAndMoon } from '../data/planets-and-moons';
import { getKeyMap } from '../engine/play';

const config = {
  initialDt: 0.001,
};

export default function EarthAndMoon() {
  const canvas = useRef();
  const [availableControls, setAvailableControls] = useState(getKeyMap());

  // TODO: when we start, we want a fresh copy of the objects
  useEffect(() => {
    if (canvas.current) {
      const { keyMap, cleanup } = play(
        canvas.current,
        systemEarthAndMoon,
        config,
      );
      setAvailableControls(keyMap);

      return cleanup;
    }
  }, []);

  const baseControls = Object.entries(availableControls?.base || {}).map(
    ([key, data]) => [key, data],
  );

  const formatKeyName = (key) => {
    switch (key) {
      case ' ':
        return 'Spacebar';
      default:
        return key.length === 1 ? key.toUpperCase() : key;
    }
  };

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

          <div className="control-button-group">
            {baseControls.map((control) => {
              const [key, action] = control;
              return (
                <button
                  className="control-button"
                  key={key}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.action();
                  }}
                >
                  <span className="key">{formatKeyName(key)}</span>
                  <span className="name">{action.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
}
