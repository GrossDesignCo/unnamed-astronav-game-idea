import { View } from '../classes/View';
import { Space } from '../classes/Space';
import { Planet } from '../classes/Planet';
import { Star } from '../classes/Star';
import { Ship } from '../classes/Ship';
import { earth, moon, asteroidAtL4 } from '../data/planets-and-moons';

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
  earth.dangerRadii = [
    [378000, 'Min'],
    [370000, 'Max'],
  ];
  // const objects = saturnAndMoons;
  const objects = [earth, moon, asteroidAtL4];

  // 0.06 was roughly stable if we scaled G by dt
  const dt = 0.001;
  const steps = 90 / dt;

  space.update(dt, objects);
  space.predictPaths(dt, objects, steps);
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

export const renderPlanetAssets = (canvas) => {
  const view = new View({ canvas });

  const objects = [
    new Planet({
      name: 'Earth',
      description: 'Description',
      pos: [0, 0], // km
      radius: 63, // km
    }),
    new Planet({
      name: 'Moon',
      pos: [200, 0],
      radius: 17,
      selected: true,
    }),
    new Planet({
      name: 'Tiny Planet',
      pos: [300, 0],
      radius: 1,
      selected: true,
    }),
    new Planet({
      name: 'Planet + Rings',
      pos: [0, 200],
      radius: 40,
      rings: [
        [58, 68],
        [70, 85],
      ],
    }),
    new Star({
      name: 'Star',
      pos: [400, 200],
      radius: 40,
    }),
  ];

  view.drawScale();
  objects.forEach((obj) => {
    obj.draw(view);
  });
};

export const renderShipAssets = (canvas) => {
  const view = new View({ canvas });

  const objects = [
    new Ship({
      name: 'Void',
      description: 'Default',
      pos: [-300, 0],
      angle: -40,
      selected: true,
    }),
    new Ship({
      name: 'TCS Heavy',
      description: 'Description',
      pos: [-300, 100],
      type: 'cargo',
      angle: -160,
    }),
    new Ship({
      name: 'Dead Ship',
      description: 'Crashed',
      pos: [-300, 200],
      angle: -30,
      dead: true,
    }),
  ];

  view.drawScale();
  objects.forEach((obj) => {
    obj.draw(view);
  });
};
