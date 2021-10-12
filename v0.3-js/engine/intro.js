import { View } from '../classes/View';
import { Space } from '../classes/Space';
import { Stats } from '../classes/Stats';
import { earthAndMoon, saturnAndMoons } from '../data/planets-and-moons';

export const playIntro = (canvas) => {
  const space = new Space({ timeScale: 1 });
  const view = new View({ canvas });
  const stats = new Stats();

  const objects = saturnAndMoons;
  // const objects = eartshAndMoon;

  // Max range here should be within 363,300km and 384,400km

  /**
   * Core Loop
   */
  let totalTime = 0;

  const loop = (newTime) => {
    // Elapsed time between renders (seconds)
    const dt = Math.max(newTime - time, 1) / 1000;
    const fakeDT = 0.06;
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
