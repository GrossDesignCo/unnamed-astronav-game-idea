import { View } from '../classes/View';
import { Space } from '../classes/Space';
import { Stats } from '../classes/Stats';

export const getKeyMap = (view, objects) => {
  // TODO:
  // 1. Fgure out why these need to be wrapped in an inline function?

  return {
    base: {
      ArrowUp: {
        name: 'Zoom In',
        action: () => view.zoomIn(),
      },
      ArrowDown: {
        name: 'Zoom Out',
        action: () => view.zoomOut(),
      },
      l: {
        name: 'Toggle Labels',
        action: () => view.toggleLabels(),
      },
      p: {
        name: 'Toggle Paths',
        action: () => view.togglePathPrediction(),
      },
      ' ': {
        name: 'Play/Pause',
        action: () => view.togglePlayPause(),
      },
      Escape: {
        name: 'Deselect all',
        action: () => {
          view.deselectAll(objects);
        },
      },
    },
    meta: {
      f: {
        name: 'Fullscreen',
        action: () => view.fullscreen(),
      },
    },
    shiftKey: {
      '+': {
        name: 'Increase Path Accuracy',
        notes: 'Can have a significant performance impact',
        action: () => {
          view.decreasePathDT();

          console.info({ pathAcc: view.pathDT });
        },
      },
      _: {
        name: 'Decrease Path Accuracy',
        action: () => {
          view.increasePathDT();

          console.info({ pathAcc: view.pathDT });
        },
      },
      ArrowUp: {
        name: 'Increase Path Distance',
        notes: 'Can have a significant performance impact',
        action: () => {
          view.increasePathDistance();
          console.info({ pathDist: view.pathDistance });
        },
      },
      ArrowDown: {
        name: 'Decrease Path Distance',
        action: () => {
          view.decreasePathDistance();
          console.info({ pathDist: view.pathDistance });
        },
      },
    },
  };
};

export const play = (canvas, objects, config) => {
  const space = new Space({ timeScale: 1 });
  const view = new View({ canvas, debug: false, isPaused: true });
  const stats = new Stats();
  let dt = config.initialDt;

  // const togglePlayPause = () => {
  //   isPaused = !isPaused;

  //   if (!isPaused) {
  //     window.requestAnimationFrame(loop);
  //   }
  // };

  // Max range here should be within 363,300km and 384,400km

  /**
   * Core Loop
   */

  const loop = (newTime) => {
    if (view.canvas) {
      // Elapsed time between renders (seconds)
      // TODO: If we ever want to support multiplayer, dt will have to be based on machine time elapsed, instead of an arbitary number,
      // otherwise two machines could get wildly out of sync in terms of game-state

      // Stop the physics and running of the engine
      if (!view.isPaused) {
        space.update(dt, objects);
        objects.forEach((obj) => {
          obj.update(dt);
        });
        stats.update(dt, space);
      }

      if (view.predictPaths) {
        space.predictPaths(view.pathDT, objects, view.pathDistance);
      }

      // without stopping rendering so the player can still interact
      view.update(objects, space);
      view.render(objects, space, stats);

      window.requestAnimationFrame(loop);
    }
  };

  window.requestAnimationFrame(loop);

  const keyMap = getKeyMap(view, objects);

  window.addEventListener('keyup', (e) => {
    // Give meta keys separate sets of actions
    if (e.ctrlKey || e.metaKey) {
      if (keyMap.meta[e.key]) {
        e.preventDefault();
        keyMap.meta[e.key].action();
      }
    } else if (e.shiftKey) {
      if (keyMap.shiftKey[e.key]) {
        e.preventDefault();
        keyMap.shiftKey[e.key].action();
      }
    } else {
      if (keyMap.base[e.key]) {
        e.preventDefault();
        keyMap.base[e.key].action();
      }
    }
  });

  window.addEventListener('resize', view.resize);
  window.addEventListener('scroll', view.zoom);

  const trackMousePos = (e) => {
    view.setMousePos(e.x, e.y);
  };
  // TODO: For some reason adding this to the cleanup causes pathing to explode.
  window.addEventListener('mousemove', trackMousePos);

  // Object Selection via mouse
  const handleMouseDown = (eDown) => {
    const handleMouseMove = (eMove) => {
      // If user presses the shift key at any time during selection,
      // add to existing selection instead of selecting entirely new objects
      if (eMove.shiftKey && !view.selectBoxAddMode) {
        view.setSelectBoxAddMode(true);
      }

      view.setSelectBox(eDown.x, eDown.y, eMove.x, eMove.y);
    };

    const handleMouseUp = (eUp) => {
      view.clearSelectBox();
      view.setSelectBoxAddMode(false);
      if (eUp.x === eDown.x && eUp.y === eDown.y) {
        view.selectPointOnNextUpdate(eDown.x, eDown.y);
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

  return {
    keyMap,
    cleanup: () => {
      window.removeEventListener('mousedown', handleMouseDown);
    },
  };
};
