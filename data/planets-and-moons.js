import { Planet } from '../classes/Planet';
import { Ship } from '../classes/ship';

const toDay = 86400;

// const temp = new Planet({
//   name,
//   description,
//   pos,
//   velocity,
//   mass,
//   radius,
//   rotationPeriod,
//   isFocalPoint
// });

/**
 * Earth and Moon closed system
 */

// Standard km/s to km/day
const lunarV = -1.02 * toDay;
const earthMass = 5.97237e24; // kg
const lunaMass = 7.349e22; // kg

// https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
export const earth = new Planet({
  name: 'Earth',
  pos: [0, 0], // km
  velocity: [0, lunarV * (lunaMass / earthMass) * -1], // km/d
  mass: earthMass, // kg
  // Set the earth's initial V to a counter-balance of the moon's
  radius: 6378.137, // km
  // rotationPeriod: 23.9345 / 24, // days per day :) // FAKE
  rotationPeriod: 1, // testing
  isFocalPoint: true,
});

// https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html
export const moon = new Planet({
  name: 'Moon',
  pos: [378000, 0],
  velocity: [0, lunarV],
  mass: lunaMass,
  radius: 1738.0,
  rotationPeriod: 27.3, // tidally locked
  isFocalPoint: true,
});

// Asteroid at roughly a lagrange point?
export const asteroidAtL4 = new Planet({
  name: 'Asteroid',
  description: 'E-M L5 (stable)',
  pos: [180000, -350000],
  velocity: [-70000, -45000],
  mass: 1.0e5,
  radius: 100,
  // isFocalPoint: true,
});

export const asteroidAtL1 = new Planet({
  name: 'Asteroid',
  description: 'E-M L1 (unstable)',
  pos: [318420, 0],
  velocity: [0, lunarV * 0.9],
  mass: 1.0e5,
  radius: 100,
  // isFocalPoint: true,
});

export const ship = new Ship({
  name: 'SS Testamundo',
  pos: [-50000, -50000],
  // km/s to days
  velocity: [-0.1 * toDay, 0.1 * toDay],
  mass: 50000,
});

/**
 * Earth and moon, a basic intro level
 */
export const earthAndMoon = [earth, moon, asteroidAtL4, asteroidAtL1, ship];
// export const earthAndMoon = [earth, moon];

/**
 * Jovian Moons closed system
 */

// Saturn!
export const saturn = new Planet({
  name: 'Saturn',
  pos: [0, 0],
  velocity: [0, 0],
  mass: 5.6834e26,
  radius: 60268,
  rotationPeriod: 0.445, // roughly 10.5 hour day
  isFocalPoint: true,
  rings: [
    // start and end radii
    [66900, 74510], // D Ring
    [74658, 92000], // C Ring
    [92000, 117580], // B Ring
    // Cassini Division
    [122170, 136775], // A Ring
    // Roche Division
    [139380, 140180],
  ],
});

// Major Moons
export const mimas = new Planet({
  name: 'Mimas',
  pos: [185520, 0],
  velocity: [0, -14.28 * toDay],
  mass: 3.79e19,
  radius: 208,
  rotationPeriod: 0.9424218, // tidally locked
  isFocalPoint: true,
});

export const enceladus = new Planet({
  name: 'Enceladus',
  pos: [238020, 0],
  velocity: [0, -12.64 * toDay],
  mass: 1.08e20,
  radius: 257,
  rotationPeriod: 1.370218, // tidally locked
  isFocalPoint: true,
});

export const tethys = new Planet({
  name: 'Tethys',
  pos: [294660, 0],
  velocity: [0, -11.35 * toDay],
  mass: 6.18e20,
  radius: 538,
  rotationPeriod: 1.887802, // tidally locked
  isFocalPoint: true,
  // Trojans:
  // Telesto
  // Calypso
});

export const dione = new Planet({
  name: 'Dione',
  pos: [377400, 0],
  velocity: [0, -10.03 * toDay],
  mass: 1.1e21,
  radius: 563,
  rotationPeriod: 2.736915, // tidally locked
  isFocalPoint: true,
  // Trojans:
  // Helene
  // Polyydeuces
});

export const rhea = new Planet({
  name: 'Rhea',
  pos: [527040, 0],
  velocity: [0, -8.48 * toDay],
  mass: 2.31e21,
  radius: 765,
  rotationPeriod: 4.5175, // tidally locked
  isFocalPoint: true,
});

export const titan = new Planet({
  name: 'Titan',
  pos: [1221830, 0],
  velocity: [0, -5.57 * toDay],
  mass: 1.3455e23,
  radius: 2575,
  rotationPeriod: 15.945421, // tidally locked
  isFocalPoint: true,
});

export const hyperion = new Planet({
  name: 'Hyperion',
  pos: [1481100, 0],
  velocity: [0, -5.07 * toDay],
  mass: 5.6e18,
  radius: 180,
  rotationPeriod: 0, // "chaotic/irregular"
  // isFocalPoint: true,
});

export const iapetus = new Planet({
  name: 'Iapetus',
  pos: [2561300, 0],
  velocity: [0, -3.26 * toDay],
  mass: 1.81e21,
  radius: 746,
  rotationPeriod: 79.330183, // tidally locked
  // isFocalPoint: true,
});

// Shepherd Moons (within the rings)
export const prometheus = new Planet({
  name: 'Prometheus',
  pos: [139353, 0],
  velocity: [0, -16.54 * toDay],
  mass: 1.6e17,
  radius: 68,
  rotationPeriod: 79.330183, // tidally locked
  // isFocalPoint: true,
});

export const daphnis = new Planet({
  name: 'Daphnis',
  pos: [136500, 0],
  velocity: [0, -16.71 * toDay],
  mass: 1e14,
  radius: 746,
  rotationPeriod: 79.330183, // tidally locked
  // isFocalPoint: true,
});

export const pan = new Planet({
  name: 'Pan',
  pos: [133583, 0],
  velocity: [0, -16.9 * toDay],
  mass: 5e15,
  radius: 17,
  rotationPeriod: 79.330183, // tidally locked
  isFocalPoint: true,
});

// https://en.wikipedia.org/wiki/Janus_(moon)#Orbit
// Janus & Epimetheus's co-orbit is fascinating
export const janus = new Planet({
  name: 'Janus',
  pos: [151472, 0],
  velocity: [0, -15.87 * toDay],
  mass: 1.9e18,
  radius: 102,
  rotationPeriod: 79.330183, // tidally locked
  isFocalPoint: true,
});

// Starting these on opposite sides, for now
export const epimetheus = new Planet({
  name: 'Epimetheus',
  pos: [-151422, 0],
  velocity: [0, 15.87 * toDay],
  mass: 5.3e17,
  radius: 65,
  rotationPeriod: 79.330183, // tidally locked
  isFocalPoint: true,
});

export const saturnAndMoons = [
  saturn,
  mimas,
  enceladus,
  tethys,
  dione,
  rhea,
  titan,
  hyperion,
  iapetus,
  prometheus,
  daphnis,
  pan,
  janus,
  epimetheus,
];
