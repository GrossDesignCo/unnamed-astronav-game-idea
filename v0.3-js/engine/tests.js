import { View } from '../classes/View';
import { Space } from '../classes/Space';
import { Planet } from '../classes/Planet';
import { Stats } from '../classes/Stats';

export const basicGravity = (canvas) => {
  const view = new View({ canvas });
  const space = new Space({ timeScale: 1 });
  const stats = new Stats();

  /**
   * TEST: If the moon were stationary, it should
   * take about 4.5 days to fall to earth
   */

  const objects = [
    new Planet({
      name: 'Terra',
      pos: [0, 0],
      mass: 5.97237e24,
      velocity: [0, 0],
      radius: 6378.137,
      isFocalPoint: true,
    }),
    new Planet({
      name: 'Luna',
      pos: [378000, 0],
      mass: 7.349e22,
      velocity: [0, 0],
      radius: 1738.0,
    }),
  ];

  /**
   * Core Loop
   */
  let totalTime = 0;
  let logTime = 0;
  let logs = 0;

  const loop = (newTime) => {
    // Elapsed time between renders (seconds)
    const dt = Math.max(newTime - time, 1) / 1000;
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

    stats.update(dt, space);
    space.update(dt, objects);
    view.update(objects, space);
    view.render(objects);

    time = newTime;
    window.requestAnimationFrame(loop);
  };

  let time = 0;
  window.requestAnimationFrame(loop);
};

export const initialPathing = (canvas) => {
  const space = new Space({ timeScale: 1 });
  const view = new View({ canvas });

  /**
   * Real planet starting data
   * 1. Load planets
   * 2. Scale should be right
   * 3. Projected path of Luna should be a rough circle around Terra
   * 4. V and A vectors should be drawn nicely
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

  const dt = 0.06;

  space.update(dt, objects);
  space.predictPaths(dt, objects);
  view.update(objects, space);
  view.render(objects);

  window.addEventListener('keyup', (e) => {
    if (e.key === ' ') {
      space.update(dt, objects);
      view.update(objects, space);
      view.render(objects);
    }
  });
};

export const renderAllAssets = (canvas) => {
  const view = new View({ canvas });

  const objects = [
    new Planet({
      name: 'Earth',
      pos: [0, 0], // km
      radius: 63, // km
    }),
    new Planet({
      name: 'Moon',
      pos: [200, 0],
      radius: 17,
    }),
    new Planet({
      name: 'TinyPlanet',
      pos: [300, 0],
      radius: 1,
    }),
  ];

  objects.forEach((obj) => {
    obj.draw(view);
  });
};
