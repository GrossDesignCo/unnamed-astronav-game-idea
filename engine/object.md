# Object Definition/Structure

## Math

Force = m*a
Acceleration = f/m
Mass = f/a

Force = G((mass1 (kg) * mass2 (kg))/(distance (m)^2))
Force = 6.674*10^11 (kg/m)^2 * mass1 (kg) * mass2 (kg) / distance (m) * distance (m)
G = 6.674*10^11 (kg/m)^2

Eventually need to figure out the more complete math that depends on mass distribution within object

## Data

Mass

- estimated (kg)
- actual (kg)

Velocity

- magnitude (x: km/s?, y: km/s)

Net Force acting on this object

- sum of gravity interaction between this object and all others in system
- (x: kg, y: kg)

Acceleration

- net force /mass

Coordinates (x, y)

Size/Shape

- start with circles (proxy for stars/planets/asteroids)
- origin point (x/y)
- radius (km)

Rate of spin (deg/s)

Need to figure out what the most efficient scale for computation is at the system level

Example Masses:

* Earth: 5.972*10^24 (kg)
* Sun: 1.989*10^30 (kg)
* Moon: 7.348*10^22 (kg)
* Typical rocket?: 5.5*10^5 (kg)

## Behaviors

Constructor(Initial coordinates, initial velocity)
