import { View } from '../classes/View';
import { Space } from '../classes/Space';
import { Stats } from '../classes/Stats';

export const play = (canvas, objects, config) => {
  const space = new Space({ timeScale: 1 });
  const view = new View({ canvas });
  const stats = new Stats();
  const keysMap = {};

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

  keysMap.base = {
    ArrowUp: {
      name: 'Zoom In',
      action: () => view.zoomIn(),
    },
    ArrowDown: {
      name: 'Zoom Out',
      action: () => view.zoomOut(),
    },
  };

  keysMap.meta = {
    f: {
      name: 'Fullscreen',
      action: () => view.fullscreen(),
    },
  };

  window.addEventListener('keyup', (e) => {
    if (keysMap.base[e.key]) {
      keysMap.base[e.key].action();
    }

    // Handle metakeys & additional controls
    if (e.ctrlKey || e.metaKey) {
      if (keysMap.meta[e.key]) {
        keysMap.meta[e.key].action();
      }
    }
  });

  window.addEventListener('resize', view.resize);
  window.addEventListener('scroll', view.zoom);

  // Object Selection via mouse
  const handleMouseDown = (eDown) => {
    const handleMouseMove = (eMove) => {
      // If user presses the shift key at any time during selection,
      // add to existing selection instead of selecting entirely new objects
      if (eMove.shiftKey && !view.selectBoxAddMode) {
        view.selectBoxAddMode = true;
      }

      view.setSelectBox(eDown.x, eDown.y, eMove.x, eMove.y);
    };

    const handleMouseUp = (eUp) => {
      // If this is a click _not_ a drag
      if (eDown.x === eUp.x && eDown.y === eUp.y) {
        handleMouseMove(eUp);
      } else {
        view.clearSelectBox();
        view.selectBoxAddMode = false;
      }

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    // Only track mouse position when necessary
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Draw a box with the mouse (to hopefully select objects)
  window.addEventListener('mousedown', handleMouseDown);
};
