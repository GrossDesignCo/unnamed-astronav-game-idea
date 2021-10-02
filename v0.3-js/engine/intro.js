import { Canvas } from '../classes/Canvas';
import { Space } from '../classes/Space';
import { Planet } from '../classes/Planet';
import { Stats } from '../classes/Stats';

export const playIntro = (canvas) => {
  const space = new Space({ timeScale: 1 });
  const view = new Canvas({ canvas });
  const stats = new Stats();

  /**
   * Data in km/day:
   * 1 day = 86400.0 seconds
   */
  const lunarV = -1.02 * 86400;

  const objects = [
    // https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
    new Planet({
      name: 'Earth',
      pos: [0, 0], // km
      mass: 5.97237e24, // kg
      // Set the earth's initial V to a counter-balance of the moon's
      velocity: [0, lunarV * (7.349e22 / 5.97237e24) * -1], // km/d
      radius: 6378.137, // km
      isFocalPoint: true,
    }),
    // https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html
    new Planet({
      name: 'Moon',
      pos: [378000, 0],
      mass: 7.349e22,
      velocity: [0, lunarV], // km/d
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
    const dt = Math.max(newTime - time, 1) / 1000;
    const fakeDT = 0.09;
    totalTime += dt;
    logTime -= dt;

    if (logTime <= 0) {
      console.log('Loop:', {
        dt,
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

    space.update(fakeDT, objects);

    stats.update(dt, space);
    view.update(objects, space);
    view.render(objects, stats);

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

  // window.addEventListener('keyup', (e) => {
  //   if (e.key === ' ') {
  //     if (playing) {
  //       playing = false;
  //     } else {
  //       playing = true;
  //       window.requestAnimationFrame(loop);
  //     }
  //   }

  //   if (e.key === 'RightArrow') {
  //     // Step forward one second
  //     loop(1000);
  //   }
  // });
};
