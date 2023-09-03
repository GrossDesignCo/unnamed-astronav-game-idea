# September

Sept 1st:

A few more days have passed since the first test flight and disastrous end.

The peoples rallied and created a better flight path control.

![better](./09-september/better-flight-planning.gif)

The forces applied to the two test ships still liquified their respective crews instantly, however progress was made!

## Next up

Lots of little improvements to make now.

Now that interaction is possible it's obvious that it's not super obvious what's going on. My wife saw how it behaved & game me a blank look like it didn't make any sense :sniff:

### Pathing

The day markers on the predicted paths aren't terribly useful. We should offset those by the days currently past, so that instead of always moving further out along the predicted path to show how many days in the future they are, they show on which T+ day from mission start. That way they stay relatively put, and it lends a feeling of progress being made, even if nothing exciting is happening at the moment.

Also, the pathing currently has a discrepancy because we're assigning the first point along the predicted path to the ship + gravity before applying thrust, so every time the player sets a path it changes a little bit between what they intended to set and what actually got committed to the ship.

### Visuals

Couple improvements already made:

- When labels are turned off, the label of a selected ship will still display. This makes it much cleaner to play. Maybe this can be enhanced by showing labels for the target/destination object (or something)
- Start the game paused. This puts the player in control from T+0, allowing themself to get oriented before being immediately thrown into a puszzle. Portal does this masterfully by creating safe stopping points all over each level so the user can stop and re-orient after making some crazy series of jumps across the map. With space, everything is always in motion, so the only way this can happen is to literally pause the sim.

Up & coming:

- Smoother paths. Right now paths are really janky when objects fly close & make tight maneuvers. A better algorithm would be to check for large changes relative to other object's positions (like if it makes more than an equalateral triangle) and split that step into two half-steps, recursively. That way we could handle very tight manuevers without losing the essential calculations to avoid errant crashes/expulsions.
- Re-designed buttons. Homeworld 3's UI almost made me cry. Will do.
- Show available hotkeys for situationally relevant actions, like `[p]` for Plan Thrust, so that the user doesn't just get thrown into thrust-planning mode on every selection. These should also be clickable/tappable for users on touch devices w/o a keyboard.
- Should generally handle touch interactions. It would be realy cool to test out the game on a phone or tablet to show to people that way.
- `[Esc]` shoudl de-select a ship without committing the planned thrust. Actions should be cancellable.
- `[Tab]` should cycle through the available objects within a system, at least the ones on screen, maybe even off screen, like if a ship goes long and the player focuses on it, it becomes one of the focal points and the camera snaps out to the wider frame of view.
- Re-designed backgrounds, make it lighter gradients sometimes, maybe like a day/night cycle almost
- In the predicted path, it should predict when something is on a collision-course with something, showing the red X of death, and not showing any path past that point.

## Long-term/misc ideas

It would be really cool to be able to re-orient the camera and pathing to like the Earth-Moon axis frame of reference, that way someone could see the classic Apollo-mission view when planning burns. As it is, it's really hard to accurately interpret whether your ship is actually going to make it into a lunar orbit or not without that. And even currently, if I introduced the sun & the earth were orbiting that, it would be even harder to understand.

It would also be really cool to add a sort of "Arcade Mode" where you could just use the WASD/QE keys to rotate and fly the ship around all chaotic-style. That way people who didn't want as much of a strategy thing could still have fun & mess around.

Add a "Download" button? Maybe something to help get the PWA-ness to be more useful & make it more like a real app.

Smooth out the thrust commit, make 1g/day's worth of the thrust apply per day (or dt's worth applied each step of the path), instead of all at once, apply it like a realistic thrust over time. This'll make the change in path look a _LOT- more streamlined.

Add a high-contrast mode, where all the paths are clearly marked in different bright colors.

Get back to writing the AI for other ships & all the super fun game ideas from the start of the project, now that the basics are more or less all working.

Add a highlight to objects when the player moves the cursor close to them, like a pre-select similar to other RTS games.

Add the ability to plan multiple burns/thrusts over time. Like if the mouse cursor is somewhere out in time along the path, allow the user to select that point on the path and plan a thrust from there.

Add a path history, parallel to the predicted path. That way if someone wants, they could turn on the history, then let the simulation run for a long time, getting these cool geometric visualizations of the paths of the solar system.

It would also be amazing to experiment with procedural generation/procgen, eg. generate systems with N planets/starts/etc and randomized start/end goals.