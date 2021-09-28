import { Canvas } from './Canvas';
import { Planet } from '../objects/Planet';
import { Stats } from '../objects/Stats';

export const basicGravity = (canvas) => {
  console.log('Init!');
  const space = new Canvas({ canvas });
  const ctx = space.getCtx();

  const objects = [
    new Stats(),
    new Planet({
      name: 'Terra',
      pos: { x: 0, y: 0 },
      mass: 5.97237e24,
      velocity: { x: 0, y: 0 },
      radius: 6378.137,
      isFocalPoint: true,
    }),
    new Planet({
      name: 'Luna',
      pos: { x: 378000, y: 0 },
      mass: 7.349e22,
      velocity: { x: 0, y: 0 },
      radius: 1738.0,
    }),
  ];

  const update = (dt) => {
    objects.forEach((obj) => {
      if (obj.computeAccel) {
        obj.computeAccel(dt, objects);
      }

      obj.update(dt, space);
    });

    space.update(objects);
  };

  const render = () => {
    ctx.clearRect(0, 0, space.getWidth(), space.getHeight());
    ctx.save();

    objects.forEach((object) => {
      object.draw(space);
    });

    ctx.restore();
  };

  /**
   * Core Loop
   */
  let totalTime = 0;
  let logTime = 0;
  let logs = 0;

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

    update(deltaTime);
    render();

    time = newTime;
    window.requestAnimationFrame(loop);
  };

  let time = 0;
  window.requestAnimationFrame(loop);
};

export const renderAllAssets = (canvas) => {
  const space = new Canvas({ canvas });

  const earth = new Planet({
    name: 'Terra',
    pos: { x: 0, y: 0 }, // km
    radius: 50, // km
  });
  earth.draw(space);

  const moon = new Planet({
    name: 'Luna',
    pos: { x: 200, y: 0 },
    radius: 10,
  });
  moon.draw(space);
};
