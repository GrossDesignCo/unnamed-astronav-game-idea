# August

Further ideas for orbit-plotting and trajectory-planning:

Display a pallete of keys for the various actions when something is selected
- If a ship is selected: 
  - B: Chart a burn (current thing, draws a line from the ship that alters trajectory)
  - J: Plot a jump (future thing, when hyperspace jumps come into play)
- If two planets are selected:
  - [ ]: Rotate view/perspective to keep the two planets horizontally or vertically aligned over time so that a ship's orbit of say, the moon would be clearly understandable.

When clicking to select
- When the mouse is active, show a 10px radius ring around it
- Only select objects that are within the radius of that ring, instead of making a +10px box like current. Should be easy to understand what's going on

## Progress!!!

Finally, we have the ability to add thrust to a ship.

Sadly, this came at the cost of the first test crew's demise. Twice.

First into the moon, then by being flung into the vast emptyness of un-created space.

![First Test Flight](./08-august/first-test-flight.gif)

Obviously there's some work still to do. First thing is to split out the "planned thrust" that happens on moving the mouse, which should control the predicted path. This shouls be distinct from real "thrust" which only gets applied on click. What we're seeing above is a constant addition of the thrust vector to the ship's velocity every frame, leading to a neat, but ultimately useless control schema.