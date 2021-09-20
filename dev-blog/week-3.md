# Dev Blog #3

9/18 - (2021)

Last week was a lot of engine learning & not much else. Goals for this week:

1. More Engine Learning, Specifically:
1. How to draw a 2D circle around a sphere in-game (make white outlined planets)
1. How to get the scale of the physics right. Distance, mass, G, and time are still tiny compared to what they should be (maybe need to migrate to UE5)
1. How to Draw lines in front of and behind objects to represent their paths

If we get ambitious, maybe:

1. Do up some simple 3d asteroids
2. Start on a basic ship class that can do some basic actions

## Camera Work

Need to keep all planets on screen
- Average the position of all planets
- get the distance between the center point and the farthest planet (+ some extra buffer space)
- set the camera to capture that space (?)

## Relativity and Orbits

Learned about general relativity's effects on orbiting bodies

https://en.m.wikipedia.org/wiki/Two-body_problem_in_general_relativity#Precession_of_elliptical_orbits

## Possible solutions to the scale problem

Double precision might help with the math, but still the distances between planets makes for a pretty sparse screen.

Options:

scale up G to force per day instead of force per second?

It would be a boring game if the moon took a literal month to orbit the earth, so about 1 day / second makes sense for the game's time-scale

That would get G into the 4-decimal range that Unreal likes

Maybe scale down masses and distances as well?

M*M and D*D means we should be able to just chop off the same number of decimal places and get the math to still work, keeping the proportions

Problem: the rocket's mass need to use used to figure out how fast it would fall, so we'd have to scale that mass too
Maybe it's some small fraction, like 0.000031 megagrams?

Figure out a scaled version of the same formulas to use?

## Art style notes

Option A:
- white outlines for each planet
- white outlines for asteroids

Option B:
- simple graphical meshes for each planet
- orange disc with little white in the middle for Mars
- low-poly blue and green with little white in the middle for Earth
- benefit to having some kind of illustration for planets is that it would be easier to visualize them spinning, especially if it's spinning once per second
