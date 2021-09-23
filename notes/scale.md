# Thoughts on Scaling

Unreal 4 has a rough limit of 7 decimal places before it gets screwy.

float: 7 digits
double: 15 digits

## Possible Scales

If 1s = 1 Day:

- Moon orbits earth every 30 seconds
- earth spins kinda overly fast (1r/s)
- earth orbits sun every 6 minutes

1s = 0.33 Day:

- Earth orbits sun every 18 minutes
- moon orbits earth every 90 seconds
- earth takes 3 seconds to make a full revolution

1s = 3 Days

- Earth orbits sun in 2 minutes
- earth spins 3 times per second (oigh)
- moon orbits in 10 seconds

Maybe play with planets that rotate slower (or on more tilted axis?)

Maybe use different scales for different levels/maps

Note: Planets orbit counter-clockwise (if looking down on Earth's north pole)

## Numbers to Scale

| start          | unit              | scaled to a day and to mega-meters |
| -------------- | ----------------- | ---------------------------------- |
| 86400 seconds  | 1 day             | 1                                  |
| 152100000 km   | 1 Earth-Sun dist  | 152100                             |
| 384400 km      | 1 Moon-Earth dist | 384.4                              |
| 5.97237e+24 kg | 1 Earth mass      |                                    |
| 6378.137 km    | 1 Earth radius    | 6.378137                           |
| 6.67408e-11    | 1 G               | 0.0057664                          |

f = (G x 1000 x 1000 x m1 x m2) / (d x d / 1000 / 1000)

instead of m/s maybe gigameters / day?

## Speeds/sizes

Estimates & Fudging:

- Need to get not just the average distances and velocities, but min/max to figure the eliptical-ness
- Relativity slows time slightly when close to big masses, leading to eliptical orbits oscillating
- Days are measured based on the planet pointing at the sun, not in some absolute direction, so rotation of most planets is actually a little faster than their days count
- Sidereal time: rotation/movement relative to the background stars (closest thing we have to absolute time). We're fudging sidereal and earth days

### Sun

Rotation is different at the equator and poles

Orbital Period: ---
Avg Speed: ---
Distance from Sun: ---
Mass: 1.9885×1030 kgd
Radius: 696,342 km
Rotation (at equator): 25.6 days (counter-clockwise)

### Mercury

Orbital Period: 87.9691 days
Avg Speed: 47.36 km/s
Distance from Sun: 69,816,900 km - 46,001,200 km
Mass: 3.3011e+23 kg
Radius: 2,439.7 km
Rotation: 176 days (counter-clockwise)

### Venus

Orbital Period: 224.701 days
Avg Speed: 35.02 km/s
Distance from Sun: 108,939,000 km
Mass: 4.8675e+24 kg
Radius: 6,051.8 km
Rotation: 243 days (clockwise)

### Earth

Orbital Period: 365.256363004 days
Avg Speed: 29.78 km/s
Distance from Sun: 152100000 km - 147095000 km
Mass: 5.97237e+24 kg
Radius: 6378.137 km
Rotation: 1.00 days (solar, questions here)

#### Moon

Orbital Period:
Avg Speed:
Distance from Earth: 384,400 km
Mass:
Radius:
Tidally locked

### Mars

Orbital period: 687 days
Avg Speed:
Distance from Sun: 141.6 million mi
Mass: 6.4171×1023 kg
Radius: 3396.2km
Rotation: 1.02749125 days

#### Phobos

Orbital Period: 0.31891023 days
Avg Speed:
Distance from Mars:
Mass: 1.0659e+16 kg
Radius:
Tidally locked

#### Demos

Orbital Period:
Avg Speed:
Distance from Mars:
Mass:
Radius:
Tidally locked?

#### Jupiter
