import { Planet } from '../classes/Planet';
import { Ship } from '../classes/Ship';
import { Station } from '../classes/Station';
import { GameUIWrapper } from '../components/game-ui-wrapper';
import {
  destination,
  earth,
  playerShip,
  secondsPerDay,
} from '../data/constants';

const config = {
  initialDt: 0.001,
};

const system = [
  // Earth
  new Planet({
    ...earth,
    isFocalPoint: true,
  }),
  // Player Ship
  new Ship({
    ...playerShip,
    // Low-ish orbit at 100x ISS-altitude
    // TODO: Improve the physics and pathing so we can work at these extreme low/high orbits
    pos: [earth.radius + 408 * 100, 0],
    // km/s to days
    velocity: [0, -3 * secondsPerDay],
    isFocalPoint: true,
  }),
  // Destination
  new Station({
    ...destination,
    // Higher orbit at 200x ISS-altitude
    pos: [-1 * (earth.radius + 408 * 200), 0],
    // km/s to days
    velocity: [0, 2.1 * secondsPerDay],
    isFocalPoint: true,
  }),
];

export default function Earth() {
  return (
    <GameUIWrapper
      config={config}
      system={system}
      title="Earth"
      description="Raise your orbit up to the station"
    />
  );
}
