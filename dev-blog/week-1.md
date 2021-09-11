# Dev Blog #1

This week I logged a bunch of ideas for ways to convert an AI-based space-navigation simulator into an indie game :)

And got started on a basic cartesian physics engine.

First step goals:

- Get basic project structure together
- Get planet classes to a basic state where they orbit each other

## Game Ideas

Big Goal #1 is to learn how AIs would handle astronavigation & develop a decently competent neural net that can handle the challenge, given realistic conditions, and use that to figure out what the constraints are. Eg. How much thrust would it actually take to realistically take a batch of settlers to Mars?

Big Goal #2 is to make this accessible somehow, and I really like the idea of turning this into a game that's fun, relatively simple, and gets people familiar with these really cool challenges, since it's not something people think about every day.

### Considerations

- balance between simple game & capable AI navigation sim
- need impotice for AI ships to get from port to port

### Ideas

Maybe long term the player owns a spaceport and is trying to mine asteroids

- like a space-based backwards mini-motorways
- ports send ships out to asteroids & hope they get baxck in time to keep station from dying
- player decides where to build/what to name ports based on some resource count

Maybe player is managing colonies & trading food for minerals

- keeping their station's people alive
- at the mercy of little AI controlled ships that bring shipments from one port to another
- can start/name/grow new colonies
- maybe some economics based on colony metrics, like supply/demand of food/water/metal/fuel, hunger levels?
- Teach players to manage logistics in orbit, like a Space-UPS sim
- receive requests from ports for shipments from other ports
- Assign ships to waiting stacks of shipments

Maybe automated civilian transports, but a player-controlled set of military ships, guarding from space-pirates or a rival faction?

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

## Early Modeling

Part of this week was figuring out the core model of how objects, classes, physics types would all work together, and just getting re-aquainted with c++ projects structures.

At the end of the week I had a (very basic) gravitational physics engine, that gave me command line output like so:

```text
Object constructed at (0,0)
Object constructed at (0,3.2889e+08)

Earth
 - Force:          0,2.7407e+20
 - Accel: 0, 396.511
 - Velocity:          0,   396.511
 - Pos:          0,   396.511

Luna
 - Force:          0,-2.7407e+20
 - Accel: 0, -31836.1
 - Velocity:      10000,  -31836.1
 - Pos:      10000,3.28858e+08

Earth
 - Force: 8.33537e+15,2.74115e+20
 - Accel: 0.0120592, 396.576
 - Velocity:  0.0120592,   793.087
 - Pos:  0.0120592,    1189.6

Luna
 - Force: -8.33542e+15,-2.74116e+20
 - Accel: -0.968244, -31841.4
 - Velocity:    9999.03,  -63677.5
 - Pos:      19999,3.28794e+08

Earth
 - Force: 1.66792e+16,2.74214e+20
 - Accel: 0.0241307, 396.72
 - Velocity:  0.0361899,   1189.81
 - Pos:  0.0482491,    2379.4

Luna
 - Force: -1.66794e+16,-2.74216e+20
 - Accel: -1.93748, -31853
 - Velocity:    9997.09,  -95530.5
 - Pos:    29996.1,3.28699e+08
```

It's very much a first pass, but the output is the Earth and Moon's state changes after T = 1 day, 2 days, 3 days. With realistic mass/distance numbers plugged in they're pulling eachother together slowly but surely.

## Raw C++ vs Game Engines

Gettnig the basic physics to work was pretty straightforward, copy some equations, translate them into code, run a loop that simulates the passage of time.

The annoying part came when I tried to figure out how to render a circle on a screen to represent either of these masses. There's basically two approaches, both with pros/cons:

### Raw C++ & a GL like OpenGL, SDL, Qt, etc

I really wanted to keep this as minimal as possible. I've never worked in game dev before, the idea of building it from scratch sounded really fun, and I like working in a primarily code environment like VS Code/Sublime Text, rather than in a dense IDE.

The brick wall I ran into was rendering an attractive circle in a window. Graphics Libraries are so low-level, that trying to learn how they worked was more about how many triangles to render to get an accurate blend of a line than about making a shape on a screen.

I was really hoping for sommething like "render me a circle at these coordinates", that would work across Mac, PC, & Web. And make it look nice, I don't want to have to reinvent anti-aliasing from scratch, this is a project about learning physics & neural net development, not graphics processing.

The other big challenge was just creating an efficient real-time game loop. The simulation is one thing, but if this project is going to be playable by people at some point I'm going to have to build interactions & game mechanics into it, which I still have no idea how to do.

### Game Engines

I looked at a few smaller game engines, didn't get much. It seems like Unity & Unreal are the two big dogs in this space, and both seemed like total overkill. I want to render a circle, not build a Call of Duty.

But after reading up & watching dev blogs from folks who have gone both routes, there seems to be broad consensus that building a game engine, and building a game on a game engine, are two very diffferent spheres of dev work.

For this project, I'll likely need to remove a lot from the early builds and try to make things as simple as possible, but using an engine as the foundation seems like the way to go. It'll also open up a lot of opportunity to expand the game side of the project down the road, which would be a constant challenge if I had to do everything from scratch, not to mention cross-platform support.

So I downloaded Unity 2020 and Unreal 5 early-access, and started learning up on how those systems work.

I haven't made a final decision, but I think Unreal is going to win out, thanks to C++ over C#, more control, and from what I can tell the docs/learning content seems to make a little more sense to me. Unity kind of turned me off by trying to do too much for the dev, and I still want to do a lot of this from scratch to get as close to a realistic sim as possible (even if it's only in 2d).

## Wrapup

We'll see. Hopefull this repo continues to get used and we don't get totally baked into the engine, but next week will tell :)

Overall not bad for a few hours work in the evenings. Have to make certain this doesn't interfere with work & life already happening.
