# sim-ai-rocket-controller

Stub. Tracking notes for a game idea. AI controller for a simulated rocket

## Neural/AI of some kind, train AI to efficciently navigate the system
* learn to navigate a system efficiently

### AI Goals/Metrics
* get from one point to another
* Conserve fuel
* Conserve time
* Conserve ship integrity / maintenance cost
* Don't crash
* Don't break down

## System
* Zoom in/out
* Pan around
* Speed Dial (Days in game / Seconds in player time)
* Pause / Save
* 2D to start (maybe 3D later, but principles should scale)
* Realistic scale/sizes (days/months, millions of tons for a planet vs a few tons for a ship
* objects come together to create a fluid map of gravitational pull
* Pre-built scenarios for testing/teaching:
  * Earth + Moon
  * Sun + Earth + Luna + Mars + Phobos + Demos
* Sol system map vs generated systems, maybe levels like in Mini Motorways with increasing complexity

### Base Object class
* Mass/Gravitational pull (Real for physics + Estimated for labels/AIs)
* velocity
* direction
* volume/size
* spin/rotation

### Stars

### Planets
* Imperfectly known/estimated mass (AI's know estimated mass, physics works based on real mass)
* Should make slingshot maneuvers possible :)
* gravity affects the ship & other objects
* Ports that ships are trying to get to

### Asteroids/hazards
* Basic physics
* gravity affects the ship & other objects

### Ships
* imperfectly known and/or variable mass, fuel, thrust capability, fuel/thrust ratio
* intensity of burn/forces increases strain on ship, reduces integrity proportional to g-forces
* mass decreases as fuel is burned
* fuel/thrust ratio worstens as ship ages (can get repaired at ports)
* occasional randomized breakdowns (eg. lose a thruster or something, breakdown % chance increases as integrity decreases)
* integrity is a proxy for ship part wear/tear and crew health

## Game Ideas
* balance between simple game & capable AI navigation sim
* need impotice for AI ships to get from port to port
* maybe long term the player owns a spaceport and is trying to mine asteroids, like a space-based mini-motorways
* maybe player is managing colonies & trading food for minerals
  * keeping their station's people alive
  * at the mercy of little AI controlled ships that bring shipments from one port to another
  * can start/grow new colonies
  * maybe some economics based on colony metrics, like supply/demand of food/water/metal/fuel, hunger levels?
