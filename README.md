# Orbital Navigation AI Sim Game Ideas

Stub. Tracking notes for a game idea. AI controller for a simulated rocket

## Neural/AI of some kind, train AI to efficiently navigate the system

- learn to navigate a system efficiently

### AI Goals/Metrics

- Take off from and land (gently) at ports
- Conserve fuel
- Conserve time
- Conserve ship integrity / maintenance cost
- Don't crash
- Don't break down

## System

- Zoom in/out
- Pan around
- Speed Dial (Days in game / Seconds in player time)
- Pause / Save
- 2D to start (maybe 3D later, but principles should scale)
- Realistic scale/sizes (days/months, millions of tons for a planet vs a few tons for a ship
- objects come together to create a fluid map of gravitational pull
- Pre-built scenarios for testing/teaching:
  - Earth + Moon
  - Sun + Earth + Luna + Mars + Phobos + Demos
- Sol system map vs generated systems, maybe levels like in Mini Motorways with increasing complexity

### Base Object class

- Imperfectly known/estimated mass (AI's know estimated mass, physics works based on real mass)
- gravitational pull (based on mass)
- velocity
- direction
- volume/size
- spin/rotation (matters most for planets/port locations)

#### Stars

- heat / radiation danger
- ships' integrity as they get close, incentive to avoid

#### Planets

- Should make slingshot maneuvers possible/useful :)
- Ports that ships are trying to get to

#### Asteroids

- navigational hazards (don't crash into them)

### Ships

- imperfectly known and/or variable mass, fuel, thrust capability, fuel/thrust ratio
- intensity of burn/forces increases strain on ship, reduces integrity proportional to g-forces
- mass decreases as fuel is burned
- fuel/thrust ratio worstens as ship ages (can get repaired at ports)
- occasional randomized breakdowns (eg. lose a thruster or something, breakdown % chance increases as integrity decreases)
- integrity is a proxy for ship part wear/tear and crew health

## Game Ideas

- balance between simple game & capable AI navigation sim
- need impotice for AI ships to get from port to port
- maybe long term the player owns a spaceport and is trying to mine asteroids
  - like a space-based backwards mini-motorways
  - ports send ships out to asteroids & hope they get baxck in time to keep station from dying
  - player decides where to build/what to name ports based on some resource count
- maybe player is managing colonies & trading food for minerals
  - keeping their station's people alive
  - at the mercy of little AI controlled ships that bring shipments from one port to another
  - can start/name/grow new colonies
  - maybe some economics based on colony metrics, like supply/demand of food/water/metal/fuel, hunger levels?
- Teach players to manage logistics in orbit, like a Space-UPS sim
  - receive requests from ports for shipments from other ports
  - Assign ships to waiting stacks of shipments
- Maybe automated civilian transports, but a player-controlled set of military ships, guarding from space-pirates or a rival faction?
  - would teach AI to have to respond to erratic human commands & destinations
  - player would get to watch their fly around via physics & learn orbital mechanics for themselves
- Waves of alien attacks that get faster and bigger until the player is overwhelmed!
  - increasingly complex systems
  - increasingly aggressive aliens
  - ability to build more-better ships to fight the aliens with
- Conpetitive mode
  - two players start on different planets
  - have to expand/out-mine each other
  - maybe survive aliens attacks longer than the other
  - destroy all each other's ships/ports

## Deployment & Live Hosting

Now that v0.3 is web-based, it was a lot easier to throw it up on Vercel & get a live url :)

Note: Pushing/merging to the `main` branch will trigger a deployment, so most ugly local work should now happen on the `dev` branch.
