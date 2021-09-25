import { Canvas } from './Canvas';
import { Planet } from '../objects/planet';

export const playGame = (canvas) => {
  const space = new Canvas({ canvas });
  const ctx = space.getCtx();

  const planets = [
    new Planet({
      name: 'Terra',
      pos: { x: 0, y: 0 },
      mass: 5.97237e24,
      radius: 20,
    }),
    new Planet({
      name: 'Luna',
      pos: { x: 100, y: 0 },
      mass: 7.348e22,
      radius: 10,
    }),
  ];

  let frameRate = 0;

  const update = (dt) => {
    frameRate = `${(1 / dt).toPrecision(2)} fps`;
  };

  const render = () => {
    ctx.clearRect(0, 0, space.width, space.height);

    ctx.save();
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.translate(10, 20);
    ctx.fillText(frameRate, 0, 0);

    planets.forEach((planet) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(space.width / 2, space.height / 2);

      ctx.translate(planet.pos.x, planet.pos.y);
      planet.draw(ctx);
    });

    ctx.restore();
  };

  /**
   * Core Loop
   */
  const loop = (newTime) => {
    // Time in seconds?
    const deltaTime = (newTime - time) / 1000;

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
