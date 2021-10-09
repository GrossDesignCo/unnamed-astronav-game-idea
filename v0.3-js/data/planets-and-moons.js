import { Planet } from '../classes/Planet';

// Standard km/s to km/day
const lunarV = -1.02 * 86400;
const earthMass = 5.97237e24; // kg
const lunaMass = 7.349e22; // kg

// https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
const earth = new Planet({
  name: 'Earth',
  pos: [0, 0], // km
  mass: earthMass, // kg
  // Set the earth's initial V to a counter-balance of the moon's
  velocity: [0, lunarV * (lunaMass / earthMass) * -1], // km/d
  radius: 6378.137, // km
  isFocalPoint: true,
  rotationPeriod: 6, // days per day :)
});

// https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html
const moon = new Planet({
  name: 'Moon',
  pos: [378000, 0],
  mass: lunaMass,
  velocity: [0, lunarV],
  radius: 1738.0,
  rotationPeriod: 27.3,
  isFocalPoint: true,
});

const asteroidForTesting = new Planet({
  name: 'Asteroid',
  pos: [200000, -25000],
  mass: 1.0e5,
  radius: 100,
  velocity: [10000, -100000],
  // isFocalPoint: true,
});

/**
 * Earth and moon, a basic intro level
 */
export const earthAndMoon = [earth, moon, asteroidForTesting];
