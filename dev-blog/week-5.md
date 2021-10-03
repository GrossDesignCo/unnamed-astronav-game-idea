# Dev Blog #5

10/2 - 10/9 (2021)

## Physics is hard. Calculus is harder

This is what I'm looking at now.

![Semi-stable](./week-5/semi-stable-fixed-dt.png)

The best I can tell currently is that different step values in both Newton's basic formula and the Runge-Kutta calculus approach has an outsized impact on the direction of the accuracy of the simulation.

Make dt too small, and the moon errs on the side of flying off into the abyss.

Make dt too large, and it errs on the side of collapsing, then catapaulting, off into the abyss.

The above is with a fixed dt of 0.09 days/step.

Ideally, we can get to a place where dt can be increased/decreased freely at any given point to speed up/slow down the simulation, but for now it's running at about 6 days/second, and the moon avoids catapaulting into the abyss for roughly 7.5 years (453 days on the first run, 758 days on the second).

The issues with dt are also what was causing path prediction to break down. The large dt (1.0 days) needed to predict 30 days into the future means that the paths are always being predicted too much in the collapse & catapault direction.

## Another possible game idea

My sister mentioned to me that if I could get the physics figured out it would be really cool to translate this into a game where a player is in a tiny boat on a big chaotic ocean, where there's waves and currents pushing them around & they have to stay afloat :)

## Goals for this week

1. Figure out the delta-time problem (maybe a softening constant isn't that crazy)
2. Scale up the sim to include Sun, Mercury, Venus, Earth + Moon
3. Use the differing scales/distances to help solve goal 1

Nice to Haves :)

4. Add some controls to speed up/slow down the sim, predict or not predict paths
5. Figure out a way to run path prediction less frequently, since it's an expensive operation
6. Maybe even add a basic player ship that both responds to keyboard controls, and is affected by the system gravity

If a softening constant is needed, or some other kind of rough error correction, I'd like to be able to explain why it is, what it does exactly. 

It would also be neat to figure out a solution to the catapaulting problem, like maybe look for instances where a vector crosses perpendicular to a planet and scale that one vector by the distance that it would pass the planet by. That might provide the braking force that would help correct for error in the highly elliptical orbits or very tight orbits, since that seems to be one of the main sources of error in the code version of Newton's math.

## Differential Equations

I've been digging into the YouTube series on Differential Equations by Three Blue One Brown and learning a lot more about how and why these kinds of approximations run into such dramatic error. The tighter the steps, the closer to accurate, and in my case, I'm probably under-setting the value of acceleration caused by force, because we would expect the moon's orbit to be much tighter and close to accurate at very small values of delta time.

A couple alternate approaches to gravity could be:

- use a tiny tiny value for dt, then run multiple steps per frame, which would be (maybe) close enough to accurate to create a stable orbit
- use a softening constant, either a constant one with a fixed dt, or one that scales inversely to dt. It would do a bad job when multiple planets got close, but might work for basic orbits 
- pre-compute the paths at a very small dt, then simply play back the fixed progression, assuming the system is determinate enough (Eg. Ships don't have the ability to move planets or anything). JPL already has the orbital positions of all the planets in three dimensions calculated for the next 8k years, so there's no need to even do the computations myself. 
- use one of the derivatives methods to get more accurate values when simulating in real time, which would be more computationally expensive but more accurate.

It seems like a trade off between real time performance and storage space.
