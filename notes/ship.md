# Ship Notes

Object (base class)

## Forward direction (deg)

Maybe direction doesn't matter for early stage,

- just track direction thrust force is applied in
- allow ship AI to apply thrust force in any direction at any time

## Data

Thrust Force (kg/s?)

- combines with net gravity force to compute net force for velocity/acceleration
- applied in forward direction
- affects

Thrust capacity

- max thrust force

Rotational Force (kg/s?)

- determines rate of turning
- somehow affects integrity

Fuel

- total thrust force that can be applied before refueling (kg)
- depletes as thrust force is applied
- total fuel mass, also reduces as thrust is applied
- assume total fuel mass is a part of default ship mass, subtract lost fuel mass from total

Integrity

- measure of ship/crew's health
- basically health points
- reduced by thrust force & radiation damage
- inversely proportional to % chance of accidents
  - Eg. I=15(100%) yields a 0.02% chance of exploding today

Possible Accidents

- reduce fuel
- reduce thrust capacity
- reduce integrity (losing all integrity causes ship to die/explode)

## Actions

Land

- must be at a port (May have to approximate position)
- stop applying thrust
- position becomes locked to port position

Take off

- port position, planet spin, planet velocity determine ship starting position, velocity
- start applying thrust
- position now defined relative to system (x, y)

Destroyed

- stop applying thrust
- maybe set a flag & allow it to keep drifting
- maybe just delete it

Combat

- projectiles might be cool
- would need to make them really fast, like rail-gun fast

Momentum

- after a hyperspace jump what happens to the existing momentum?
- how does the momentum transfer affect the orbital path?
