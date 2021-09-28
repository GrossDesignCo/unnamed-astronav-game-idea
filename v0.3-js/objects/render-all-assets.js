import { Canvas } from '../engine/Canvas';
import { Planet } from '../objects/Planet';

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

  const tiny = new Planet({
    name: 'TinyPlanet',
    pos: { x: 300, y: 0 },
    radius: 1,
  });
  tiny.draw(space);
};
