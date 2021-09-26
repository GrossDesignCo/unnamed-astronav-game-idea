import { Canvas } from './Canvas';
import { Planet } from '../objects/Planet';
import { Stats } from '../objects/Stats';

export const playGame = (canvas) => {
  console.log('Init!');
  // 1 Day: 368000
  const space = new Canvas({ canvas });
  const ctx = space.getCtx();

  const objects = [
    new Stats(),
    // https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
    new Planet({
      name: 'Terra',
      pos: { x: 0, y: 0 }, // m
      mass: 5.97237e24, // kg
      velocity: { x: 0, y: 0 }, // m/s
      radius: 6378137, // m
      isFocalPoint: true,
    }),
    // https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html
    new Planet({
      name: 'Luna',
      pos: { x: 0, y: 378000000 },
      mass: 7.348e22,
      velocity: { x: 970, y: 0 },
      // velocity: { x: 0, y: 1022 * space.timeScale },
      radius: 1738100,
    }),

    // Test Bodies
    // new Planet({
    //   name: 'Big',
    //   pos: { x: 0, y: 0 },
    //   mass: 100000,
    //   velocity: { x: 0, y: 0 },
    //   radius: 100,
    //   isFocalPoint: true,
    // }),
    // new Planet({
    //   name: 'Small',
    //   pos: { x: 300, y: 400 },
    //   mass: 1000,
    //   velocity: { x: 0, y: 0 },
    //   radius: 10,
    // }),
  ];

  console.log('Start:', { dist: space.maxDist, objects });

  const update = (dt) => {
    console.log('Update', { objects });
    objects.forEach((obj) => {
      if (obj.computeNetGForceFrom) {
        obj.computeNetGForceFrom(objects);
      }

      obj.update(dt, space);
    });

    space.update(objects);
    console.log('Done Updating', { objects });
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

    if (space.maxDist > 1e10 || logs > 3) {
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
};
