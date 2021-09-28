import { update } from './update';
import { render } from './render';
import { Canvas } from '../objects/Canvas';
import { Planet } from '../objects/Planet';
import { Stats } from '../objects/Stats';

export const playIntro = (canvas) => {
  const space = new Canvas({ canvas });

  /**
   * Data in km/day:
   * 1 day = 86400.0 seconds
   */

  const objects = [
    new Stats(),
    // https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
    new Planet({
      name: 'Terra',
      pos: { x: 0, y: 0 }, // km
      mass: 5.97237e24, // kg
      velocity: { x: 0, y: 0 }, // km/d
      radius: 6378.137, // km
      isFocalPoint: true,
    }),
    // https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html
    new Planet({
      name: 'Luna',
      pos: { x: 378000, y: 0 },
      mass: 7.349e22,
      // velocity: { x: 0, y: 0 }, // km/d
      velocity: { x: 0, y: -0.97 * 86400 }, // km/d
      radius: 1738.0,
    }),
  ];

  /**
   * Core Loop
   */
  let totalTime = 0;
  let logTime = 0;
  let logs = 0;
  let playing = true;

  const loop = (newTime) => {
    // Elapsed time between renders (seconds)
    const deltaTime = Math.max(newTime - time, 1) / 1000;
    totalTime += deltaTime;
    logTime -= deltaTime;

    if (logTime <= 0) {
      console.log('Loop:', {
        deltaTime,
        totalTime,
        dist: space.maxDist,
        objects,
      });

      logTime = 1;
      logs += 1;
    }

    if (space.maxDist > 1e8) {
      console.log('Stopping Sim');
      return;
    }

    update(deltaTime, space, objects);
    render(space, objects);

    time = newTime;
    if (playing) {
      window.requestAnimationFrame(loop);
    }
  };

  let time = 0;
  window.requestAnimationFrame(loop);

  /**
   * Event Listeners
   */
  // const keyMap = {
  //   68: 'right',
  //   65: 'left',
  //   87: 'up',
  //   83: 'down',
  // };
  // const keydown = (e) => {
  //   var key = keyMap[e.keyCode];
  //   state.pressedKeys[key] = true;
  // };
  // const keyup = (e) => {
  //   var key = keyMap[e.keyCode];
  //   state.pressedKeys[key] = false;
  // };

  // window.addEventListener('keydown', keydown, false);
  // window.addEventListener('keyup', keyup, false);

  window.addEventListener('keyup', (e) => {
    if (e.key === ' ') {
      if (playing) {
        playing = false;
      } else {
        playing = true;
        window.requestAnimationFrame(loop);
      }
    }

    if (e.key === 'RightArrow') {
      // Step forward one second
      loop(1000);
    }
  });
};
