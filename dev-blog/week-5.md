# Dev Blog #5

10/2 - 10/9 (2021)

## Physics is hard. Calculus is harder

This is what I'm looking at now.

![Semi-stable](./week-5/semi-stable-fixed-dt.png)

The best I can tell currently is that different step values in both Newton's basic formula and the Runge-Kutta calculus approach has an outsided impact on the direction of the accuracy of the simulation.

Make dt too small, and the moon errs on the side of flying off into the abyss.

Make dt too large, and it errs on the side of collapsing, then catapaulting, off into the abyss.

The above is with a fiixed dt of 0.09 days/step.

Ideally, we can get to a place where dt can be increased/decreased freely at any given point to speed up/slow down the simulation, but for now it's running at about 6 days/second, and the moon avoids catapaulting into the abyss for roughly 7.5 years (453 days on the first run, 758 days on the second).

The issues with dt are also what was causing path prediction to break down. The large dt (1.0 days) needed to predict 30 days into the future means that the paths are always being predicted too much in the collapse & catapault direction.

## Another possible game idea

My sister mentioned to me that if I could get the physics figured out it would be really cool to translate this into a game where a player is in a tiny boat on a big chaotic ocean, where there's waves and currents pushing them around & they have to stay afloat :)
