import { Planet } from '../classes/Planet';
// import { Ship } from '../classes/Ship';
// import { Station } from '../classes/Station';
import { GameUIWrapper } from '../components/game-ui-wrapper';
import {
  // destination,
  // playerShip,
  secondsPerDay,
} from '../data/constants';

const config = {
  initialDt: 0.001,
};

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
  velocity: [0, -14.28 * secondsPerDay],
  mass: 3.79e19,
  radius: 208,
  rotationPeriod: 0.9424218, // tidally locked
  isFocalPoint: true,
});

export const enceladus = new Planet({
  name: 'Enceladus',
  pos: [238020, 0],
  velocity: [0, -12.64 * secondsPerDay],
  mass: 1.08e20,
  radius: 257,
  rotationPeriod: 1.370218, // tidally locked
  isFocalPoint: true,
});

export const tethys = new Planet({
  name: 'Tethys',
  pos: [294660, 0],
  velocity: [0, -11.35 * secondsPerDay],
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
  velocity: [0, -10.03 * secondsPerDay],
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
  velocity: [0, -8.48 * secondsPerDay],
  mass: 2.31e21,
  radius: 765,
  rotationPeriod: 4.5175, // tidally locked
  isFocalPoint: true,
});

export const titan = new Planet({
  name: 'Titan',
  pos: [1221830, 0],
  velocity: [0, -5.57 * secondsPerDay],
  mass: 1.3455e23,
  radius: 2575,
  rotationPeriod: 15.945421, // tidally locked
  isFocalPoint: true,
});

export const hyperion = new Planet({
  name: 'Hyperion',
  pos: [1481100, 0],
  velocity: [0, -5.07 * secondsPerDay],
  mass: 5.6e18,
  radius: 180,
  rotationPeriod: 0, // "chaotic/irregular"
  // isFocalPoint: true,
});

export const iapetus = new Planet({
  name: 'Iapetus',
  pos: [2561300, 0],
  velocity: [0, -3.26 * secondsPerDay],
  mass: 1.81e21,
  radius: 746,
  rotationPeriod: 79.330183, // tidally locked
  // isFocalPoint: true,
});

// Shepherd Moons (within the rings)
export const prometheus = new Planet({
  name: 'Prometheus',
  pos: [139353, 0],
  velocity: [0, -16.54 * secondsPerDay],
  mass: 1.6e17,
  radius: 68,
  rotationPeriod: 79.330183, // tidally locked
  // isFocalPoint: true,
});

export const daphnis = new Planet({
  name: 'Daphnis',
  pos: [136500, 0],
  velocity: [0, -16.71 * secondsPerDay],
  mass: 1e14,
  radius: 746,
  rotationPeriod: 79.330183, // tidally locked
  // isFocalPoint: true,
});

export const pan = new Planet({
  name: 'Pan',
  pos: [133583, 0],
  velocity: [0, -16.9 * secondsPerDay],
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
  velocity: [0, -15.87 * secondsPerDay],
  mass: 1.9e18,
  radius: 102,
  rotationPeriod: 79.330183, // tidally locked
  isFocalPoint: true,
});

// Starting these on opposite sides, for now
export const epimetheus = new Planet({
  name: 'Epimetheus',
  pos: [-151422, 0],
  velocity: [0, 15.87 * secondsPerDay],
  mass: 5.3e17,
  radius: 65,
  rotationPeriod: 79.330183, // tidally locked
  isFocalPoint: true,
});

export const system = [
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

export default function Saturn() {
  return (
    <GameUIWrapper
      config={config}
      system={system}
      title="Saturn"
      description="Like skipping rocks"
    />
  );
}
