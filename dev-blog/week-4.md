# Dev Blog #4

9/25 - 10/2 (2021)

## Thank the Lord for web technologies

24 hours in to working in js/canvas and it's like a breath of fresh air.

I didn't realize how frustrated I was getting with the Unreal Editor. I'm sure the engine itself is fine, but the editor took 5-10 minutes just to start up, contained 15 billion settings and shaders I didn't want (even with the most minimal setup), took up multiple gigs of ram to have open, and turned the laptop into a furnace.

Also it killed the fun of just coding for me. Blueprints are a neat way to visualize logic, but they (and most everything else about the Unreal Editing experience) were just too much of what I didn't want, and not enough of what I did.

There's such a tight loop now between what I'm coding, what I'm seeing on the screen, everything. It's smaller, more lightweight, simpler.

I'm probably just happy to be back in a space that I'm familiar with. I'm sure all the things that I want to do are totally possible in either straight C++ or Unreal or Unity, since none of it is really that complex (at least so far).

The best piece of advise I saw while comparing game engines to custom code was: "Use whatever framework you already know". There's cool stuff to be built, and the best tech stack is the one we can actually get stuff done in.

## Goals for this week

1. Get Gravity right
2. Create a tests page (eg. moon/earth no velocities, moon/earth expected orbital path)
3. Generate the _expected_ position of each body for the next 30 adys
4. When we get to a circle for the moon and a much smaller circle for earth, then we can run motion and see if the predicted matches actual
5. Learn more orbital mechanics and math

See if JS already has a class baked in for vectors

Create a projection method, start with an array of positions with increasing time

Figure out real softening metric so that two bodies with no collisions should sort of spring around each other

Real play/pause

Componentize space to create multiple levels

Learn the math to be able to generate stable orbits

## Gravity Notes

With two large spherical bodies, gravity is slightly different from Newtonian point-masses. This was the problem I ran into early on in Unreal, where point masses can get infinitely close to eachother, which causes the force to approach infinity, taking acceleration, velocity, and position along with it, and in a single frame the smaller mass can accelerate too far away from the larger for the simulation to recover.

Some approaches use a softening constant (eg. https://css-tricks.com/creating-your-own-gravity-and-space-simulator/) which adds a fraction of the distance back in as the smaller body gets close.

TBD what the real math is to get it right.

Ideally we could reduce the pull of gravity from the center by some proportion of the two masses' radii, so that force approached zero as the masses started to intersect. In a theoretical world where the moon could slowly fall through the earth, it would hit a point where gravity was zero, as the earth would be evenly distributed on all sides around it.