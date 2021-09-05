# sim-ai-rocket-controller

Stub. Tracking notes for a game idea. AI controller for a simulated rocket

* Rocket/spaceship
** 
** imperfectly known and/or variable mass, fuel, thrust capability, fuel/thrust ratio
** intensity of burn increases strain on ship, reduces integrity
** mass decreases as fuel is burned
** fuel/thrust ratio worstens as ship ages (can get repaired at ports)
** occasional randomized breakdowns (eg. lose a thruster or something)
** basic physics

* Neural/AI of some kind, train AI to efficciently navigate the system
** ???

* System
** Zoom in/out
** Pan around
** 2D to start, maybe 3D later
** Realistic scale/sizes
** 1-2 Stars (or maybe 0-N objects of random mass?)

* Base Object class
** Mass/Gravitational pull
** velocity
** direction
** volume/size

* Planets
** Basic physics
** Rotational momentum, mass, gravity
*** Should make slingshot maneuvers possible :)
** gravity affects the ship & other objects
** Ports that the ship is trying to get to

* Asteroids/hazards
** Basic physics
** gravity affects the ship & other objects

* Goals
** get from one point to another
** Conserve fuel
** Conserve time
** Conserve strain on the ship / maintenance cost
** Don't crash
** Keep ship from losing integgrity
