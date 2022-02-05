import { View } from '../classes/View';
import { Space } from '../classes/Space';
import { Stats } from '../classes/Stats';

export const play = (canvas, objects, config) => {
  const space = new Space({ timeScale: 1 });
  const view = new View({ canvas });
  const stats = new Stats();

  // Max range here should be within 363,300km and 384,400km

  /**
   * Core Loop
   */
  let totalTime = 0;

  const loop = (newTime) => {
    if (view.canvas) {
      // Elapsed time between renders (seconds)
      const dt = Math.max(newTime - time, 1) / 1000;
      const fakeDT = config.initialDt;
      totalTime += dt;

      space.update(fakeDT, objects);
      objects.forEach((obj) => {
        obj.update(fakeDT);
      });
      stats.update(fakeDT, space);
      view.update(objects, space);
      view.render(objects, space, stats);

      time = newTime;
      window.requestAnimationFrame(loop);
    }
  };

  let time = 0;
  window.requestAnimationFrame(loop);

  // TODO:
  // 1. Fgure out why these need to be wrapped in an inline function?
  // 2. Convert controls map into it's own global that can be rendered on a page

  const controlsMap = {
    ArrowUp: {
      name: 'Zoom In',
      action: () => view.zoomIn(),
    },
    ArrowDown: {
      name: 'Zoom Out',
      action: () => view.zoomOut(),
    },
  };

  const metaControlsMap = {
    f: {
      name: 'Fullscreen',
      action: () => view.fullscreen(),
    },
  };

  window.addEventListener('keyup', (e) => {
    if (controlsMap[e.key]) {
      controlsMap[e.key].action();
    }

    // Handle metakeys & additional controls
    if (e.ctrlKey || e.metaKey) {
      if (metaControlsMap[e.key]) {
        metaControlsMap[e.key].action();
      }
    }
  });
};
