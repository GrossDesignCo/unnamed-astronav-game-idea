import Head from 'next/head';
import { View } from '../../classes/View';
import { Planet } from '../../classes/Planet';
import { Star } from '../../classes/Star';
import { MenuButton } from '../../components/menu-button';
import { useEffect, useRef } from 'react';

export default function GeneratePlanet() {
  const canvas = useRef();

  useEffect(() => {
    if (canvas.current) {
      const test = (canvas) => {
        const view = new View({
          canvas,
          defaultZoomLevel: 2,
          showLabels: true,
        });

        // Generic view-scale model planet and star
        const planet = new Planet({
          name: 'Planet',
          pos: [0, 0],
          radius: 100,
          mass: 1,
          protoypeStyle: true,
          rings: [
            [110, 120],
            [125, 127],
          ],
        });

        const star = new Star({
          name: 'Star',
          pos: [-500, 0],
          radius: 10,
          mass: 0,
        });

        const objects = [planet, star];

        // Allow zooming in/out
        const handleKeyDown = (e) => {
          const actions = {
            ArrowUp: {
              name: 'Zoom In',
              action: () => view.zoomIn(),
            },
            ArrowDown: {
              name: 'Zoom Out',
              action: () => view.zoomOut(),
            },
          };

          actions?.[e?.key]?.action?.();
          view.update(objects);
          view.render(objects);
        };

        view.update(objects);
        view.render(objects);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      };

      const cleanup = test(canvas.current);

      return cleanup;
    }
  }, [canvas]);

  return (
    <div>
      <Head>
        <title>Test | Generate Planet</title>
        <meta name="description" content="A game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="caption">
          <p>Generate Planet</p>

          <MenuButton href="/">Main</MenuButton>
        </div>

        <canvas ref={canvas} id="canvas" width="1496" height="488" />
      </main>
    </div>
  );
}
