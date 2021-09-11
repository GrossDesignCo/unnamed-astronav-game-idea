# Dev Blog #2

Goals for this week:

1. Learn the basics of Unreal Engine (levels, objects) & how to get some realistic physics working at a planetary system scale
2. Mock up an example or two of what a game might look like (either in-editor or with Figma or something)
3. Read up on AI dev & what the best inputs would be to simulate a real ship

## 2D vs 3D

Open question for now, maybe the best approach, if I'm going to be stuck with an overkill game engine anyway, is to start with 3D and use an isomorphic camera to fake a 2D game.

1. It probably wouldn't be that much more expensive in terms of performance
2. Closer to real-world physics
3. Creating 3d views or aspects would be a lot simpler long-term

Idea: Use a shader to draw a thick white line around the edge of planets, leaving them black, so that in 3D you could pan around, but the planet always looks like a 2D circle on the screen, Asteroids-style.
