import { View } from '../classes/View';
import { Space } from '../classes/Space';
import { Planet } from '../classes/Planet';
import { earthAndMoon } from '../data/planets-and-moons';

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
  // const objects = saturnAndMoons;
  const objects = earthAndMoon;

  // 0.06 was roughly stable if we scaled G by dt
  const dt = 0.003;
  const steps = 30000;

  space.update(dt, objects);
  space.predictPaths(dt, objects, steps);
  view.update(objects, space);
  view.render(objects);
  console.log({ space, objects, view });

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
    new Planet({
      name: 'Saturn',
      pos: [0, 300],
      radius: 50,
      rings: [
        [58, 68],
        [70, 85],
      ],
    }),
  ];

  objects.forEach((obj) => {
    obj.draw(view);
  });
};
