import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { MenuButton } from '../components/menu-button';
import { play } from '../engine/play';
import { getKeyMap } from '../engine/play';

export const GameUIWrapper = ({ config, system, title, description }) => {
  const canvas = useRef();
  const [availableControls, setAvailableControls] = useState(getKeyMap());

  // TODO: when we start, we want a fresh copy of the objects
  useEffect(() => {
    if (canvas.current) {
      const { keyMap, cleanup } = play(canvas.current, system, config);
      setAvailableControls(keyMap);

      return cleanup;
    }
  }, [config, system]);

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
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="caption">
          <MenuButton href="/">Main</MenuButton>

          <h1 className="system-name">{title}</h1>
        </div>

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

        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
};
