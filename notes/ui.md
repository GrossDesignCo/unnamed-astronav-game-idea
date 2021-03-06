# UI Notes

## Controls

Pan (x, y)

Zoom (z)
- maybe as you zoom in, the time scale slows down
- Eg. Zoom in on a couple ships before they fight,
- scales from 1 day/second to 1 hour, then 10 minutes, etc
- so the user can micro/control the ships

Rotate (?)

- seems kinda weird, but maybe?
- might give people vertigo

Scale objects (0-N)

- 1 would be actual size
- realistic solar system scale would be kind of boring to look at / hard to see
- warp distances somehow so that the view gets more zoomed in the closer it gets to an object
- similar to Homeworld Remastered setting (?)

Pause

Speed (0-N days/s)

- default to 0.25 maybe?

Save

- objects
  - all data
- date/time
- settings (speed, zoom, etc)

Auto save?

Toggle projected path lines
- need to either make everything run on a track, or do lite-paths, like one step per day instead of a thousand, so that we could reasonably recalculate every tick.

## View

Tracks the center of mass of the system (all objects)

As the user moves around, view is constantly adjusted to keep the system in view, even if the whole system is gradually moving away from (0,0)

Show paths of each object for the next N days

## Visuals

### Stars

Solid white disc
Gradient white to black indicating radiation

### Planets

White circle
White/light grey line indicating future path

Some kind of topography maybe to help visualize spin

Some way to visualize the gravity wells and directions of pull across the system

### Ships

Player color
Little flame for thrust, changes size based on thrust value
Little stat lines like fuel & integrity

## Lines

Predicted paths of planets can be white or very light grey
Paths of asteroids should probably be a darker/middle grey
Ship paths should be blue? Then maybe green when they connect gracefully with a planet, or red when they would crash

Also it would be neat to visualize Lagrange points, basically a line through the large and small body, then two equilateral triangles drawn from their two centers

Also for tests, draw two circles around Earth, one for the max distance of the moon and one for the min, to help make sure the moon's orbit is within that shape

## Basic Extras

Buttons
Icons in the buttons

- activate is just text
- undo is a close icon with the text, and filled style
- full screen/exit
- sound on/off
- play a mission has the double-arrow pointing left

## Control schemes

Automated

- user selects ship
- user clicks on planet to tell the ship to land there
- how to tell it to orbit (at what distance) instead?
- ai balances efficiency, speed, etc

Manual

- user selects ship
- user (somehow) sets thrust direction, power, duration
- ship is moving (maybe) while user interacts with it
  - maybe do it like bad north where the game slows to near-pause when a ship is selected
  - multiplayer?!? (Distant future probably)
- show user fading line for projected path

Gravity

- subtle moving streaks to give indication
- Topographic lines?

