import { Planet } from '../classes/Planet';
import { Ship } from '../classes/Ship';
import { Station } from '../classes/Station';
import { GameUIWrapper } from '../components/game-ui-wrapper';
import {
  earth,
  moon,
  playerShip,
  destination,
  secondsPerDay,
} from '../data/constants';

const config = {
  initialDt: 0.001,
};

/**
 * Earth and Moon closed system
 */

// Moon km/s to km/day
const lunaV = 1.02 * secondsPerDay;
const lunaPerigree = 378000; // km

const system = [
  // Earth
  new Planet({
    ...earth,
    // Set the earth's initial V to a counter-balance of the moon's to center their barrycenter
    velocity: [0, lunaV * (moon.mass / earth.mass) * -1], // km/d
    isFocalPoint: true,
  }),
  // Moon
  new Planet({
    ...moon,
    pos: [0, lunaPerigree],
    velocity: [lunaV, 0],
    isFocalPoint: true,
  }),
  // Player Ship
  new Ship({
    ...playerShip,
    // Low-ish orbit at 200x ISS-altitude (destination point from prev. level)
    // TODO: Improve the physics and pathing so we can work at these extreme low/high orbits
    pos: [earth.radius + 408 * 200, 0],
    // km/s to days
    velocity: [0, -2.1 * secondsPerDay],
    isFocalPoint: true,
  }),
  // Destination
  new Station({
    ...destination,
    // Moderate orbit around the moon at 100x Apollo mission altitude
    pos: [0, lunaPerigree + 110 * 100],
    // km/s to days
    velocity: [lunaV + 0.5 * secondsPerDay, 0],
    isFocalPoint: true,
  }),
];

export default function EarthAndMoon() {
  return (
    <GameUIWrapper
      config={config}
      system={system}
      title="Earth & Moon"
      description="Achieve orbit alongside the lunar staging area"
    />
  );
}
