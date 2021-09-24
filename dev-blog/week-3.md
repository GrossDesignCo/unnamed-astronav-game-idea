# Dev Blog #3

9/18 - 9/ (2021)

Last week was a lot of engine learning & not much else. Goals for this week:

1. More Engine Learning, Specifically:
1. How to draw a 2D circle around a sphere in-game (make white outlined planets)
1. How to get the scale of the physics right. Distance, mass, G, and time are still tiny compared to what they should be (maybe need to migrate to UE5)
1. How to Draw lines in front of and behind objects to represent their paths

If we get ambitious, maybe:

1. Do up some simple 3d asteroids
1. Start on a basic ship class that can do some basic actions
1. Add nametags to planets

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

ALTERNATELY

Input values as two variables: MassVal and MassPower (eg. 1.234 andd 22 => 1.234e+22)

Then replicate C++'s native math in blueprints or use a C++ class and generate the true numbers that way

## Art style notes

Option A:

- white outlines for each planet
- white outlines for asteroids

Option B:

- simple graphical meshes for each planet
- orange disc with little white in the middle for Mars
- low-poly blue and green with little white in the middle for Earth
- benefit to having some kind of illustration for planets is that it would be easier to visualize them spinning, especially if it's spinning once per second

## Engine Facepalms

Seriously, why doesn't UE support scientific notation again?

Also, object scale and distance don't use the same units. An there's no clear conversion scale between one and the other

## Maybe HTML/CSS/JS/Canvas/SVG?

Engines seem to be designed to do a thousand things that I don't need for this project, and actually very few of the things I do need.

Eg. Asteroids ship in JS: https://www.sitepoint.com/quick-tip-game-loop-in-javascript/

Let's break it down:

| Need                       | Unreal | Raw C++ | Web     |
| -------------------------- | ------ | ------- | ------- |
| draw basic polygons        | ?      | hard    | easy    |
| draw fancy 3d environments | easy   | hard    | ?       |
| scientific notation math   | hard   | easy    | easy    |
| efficient core game loop   | easy   | hard    | ?       |
| Easy interactable UI/Menu  | easy   | hard    | easy    |
| Deployable to platforms    | ?      | hard    | ?       |
| DRAW A 2D CIRCLE           | BLARGH | BLARGH  | easy :) |
| Write code                 | ?      | medium  | easy    |

A lot of the things that are "hard" in this table are really just hard for me, at the moment, because I'm a lot less familiar with Unreal & C++'s ways of handling graphics and user input.

Unity might be a better game engine option here, as it seems catered more towards simple games. It probably has more utility for simpler 2d games than unreal does.

I think based on these I should at least try to mock a basic system with the logic I have so far in a canvas/js method. It'll be mostly familiar technology so hopefully it'll go faster than the C++/Unreal learnings. I know the JS ecosystem and tools 1000 times better than C/#/++ and Unity/Unreal, so getting off the ground would (probably) be a lot smoother.

Also, TIL js has support for scientific notation:

```text
test = 3.123e+33
> 3.123e+33
test2 = 6.6e-22
> 6.6e-22
test * test2
> 2061180000000.0002

Calculator: 2.06118e+12
C++: 2.06118e+12
JavaScript: 2061180000000.0002
JS (test * test2).toPrecision(6): '2.06118e+12'
```

The margin of error is pretty negligible for doing in-game physics. It's not like I'm running a simulation for thousands of years or anything
