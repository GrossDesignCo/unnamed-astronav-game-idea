import { View } from '../classes/View';
import { Space } from '../classes/Space';
import { Stats } from '../classes/Stats';

export const getKeyMap = (view) => {
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

          console.log({ pathAcc: view.pathDT });
        },
      },
      _: {
        name: 'Decrease Path Accuracy',
        action: () => {
          view.increasePathDT();

          console.log({ pathAcc: view.pathDT });
        },
      },
      ArrowUp: {
        name: 'Increase Path Distance',
        notes: 'Can have a significant performance impact',
        action: () => {
          view.increasePathDistance();
          console.log({ pathDist: view.pathDistance });
        },
      },
      ArrowDown: {
        name: 'Decrease Path Distance',
        action: () => {
          view.decreasePathDistance();
          console.log({ pathDist: view.pathDistance });
        },
      },
    },
  };
};

export const play = (canvas, objects, config) => {
  const space = new Space({ timeScale: 1 });
  const view = new View({ canvas, debug: false });
  const stats = new Stats();
  let isPaused = false;
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

  const keyMap = getKeyMap(view);

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
