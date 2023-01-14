# January

Path forward, goals for a hackathon day:

- create a play/pause state switch
- pause triggers the path prediction
- phase 2 of pause allows a user to set burns and course corrections
- phase 2 depends on introducing thrust to ships

If nothing else, that would give us a functional ship orbit/flight-path playground to mess around with

Lord-willing, this year I won't get sidelined by Jury Duty taking over the hackathon days. Please Lord.

## Real-Time Path Prediction

![Jan Pathing Live](./01-january/jan-1-pathing-live.gif)

Path prediction is going to have to be running constantly if the AI opponents/ships are going to be able to make their own decisions, so it's necessary to figure out a way to demo paths real-time.

For the user these won't be quite as useful with some of the chaotic results that can happen when the simulation's margin of error increases, like with the unstable L1 asteroid above.

Added controls:

- p

Toggle path visibility

- SHIFT+
- SHIFT-

Increase/Decrease Prediction Accuracy

- SHIFT Up
- SHIFT Down

Increase/Decrease Prediction Distance/Time

Both of these settings have large-ish performance impact, these would be good candidates to eventually move into a user-settings object where they could be set with a slider or something isntead of keys.

Also Pausing now turns on path visibility.

## Next Up: Burns

The next step towards getting something actually interactive is giving the player the ability to execute course corrections to a ship.

This means having to create thrust and giving ships the ability to course-correct.

Hopefully that won't be too crazy, but we'll see :)
