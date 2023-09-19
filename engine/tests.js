import { View } from '../classes/View';
import { Planet } from '../classes/Planet';
import { Star } from '../classes/Star';
import { Ship } from '../classes/Ship';

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
      radius: 10,
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
