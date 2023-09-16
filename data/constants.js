export const secondsPerDay = 86400;

/**
 * Player Data
 */

// TODO: Let the player name their ship & decide on a type like cargo, fighter, etc.
export const playerShip = {
  name: 'SS Testamundo',
  mass: 549054, // kg // Weight of a SpaceX Falcon 9 Heavy
};

/**
 * Re-used Planetary Data
 */

export const destination = {
  name: 'Destination Station',
  description: 'Get your ship here',
  type: 'destination',
  mass: 420000, // kg // mass of ISS
};

export const earth = {
  name: 'Earth',
  description: 'Humanity, Terra, the Homeworld',
  mass: 5.97237e24, // kg
  radius: 6378.137, // km
  rotationPeriod: 23.9345 / 24, // revolutions per day
};

export const moon = {
  name: 'Moon',
  description: 'Luna, _the_ moon',
  mass: 7.349e22, // kg
  radius: 1738.0,
  rotationPeriod: 27.3, // tidally locked
};
