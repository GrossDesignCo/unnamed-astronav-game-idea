# Dev Blog #2

Goals for this week:

1. Learn the basics of Unreal Engine (levels, objects) & how to get some realistic physics working at a planetary system scale
2. Mock up an example or two of what a game might look like (either in-editor or with Figma or something)
3. Read up on AI dev & what the best inputs would be to simulate a real ship

Let's just see if we can get an Earth and Moon to orbit eachother :)

## 2D vs 3D

Open question for now, maybe the best approach, if I'm going to be stuck with an overkill game engine anyway, is to start with 3D and use an isomorphic camera to fake a 2D game.

1. It probably wouldn't be _that_ much more expensive in terms of performance
2. Closer to real-world physics
3. Creating 3d views or aspects would be a lot simpler long-term

Idea: Use a shader to draw a thick white line around the edge of planets, leaving them black, so that in 3D you could pan around, but the planet always looks like a 2D circle on the screen, Asteroids-style.

## Notes

Found a good solar system scale reference: https://joshworth.com/dev/pixelspace/pixelspace_solarsystem.html

Idea: Start simple & zoom out, slowly getting more and more chaotic

- Start slow & get faster
- Places get mad somehow?
- Something comes after you (aliens, space pirates)

## Engine Learning

- Unreal 4's Blueprints only support float precision, not doubles
- Can't use 6.674e-11 notation in blueprints (might be a float issue, but probably need to just go back to the code editor)
- There's a humorous spike that happens when bodies are heading towards eachother and get nearly infnitely close, which dials up the gravitational force to near infinite, and hurls them crazy fast in opposite directions (just need to implement object radii to prevent that, UE handles collisions remarkably well)

## Timeline

2-3 weeks to system/orbital bodies
1-2 weeks art style stuff
2-3 months for AI dev
