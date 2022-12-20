# December

I've started dreaming about orbital mechanics and space battles.

Most recently about two capital ships in one part of the system, and a civilian/converted station in another

The two capital ships have two enemy ships warp in nearby but split so that they're surrounding my ships

The two enemy ships are slightly stronger and slightly faster, and immediately start burning in opposite directions to try to separate my two ships

Realizing this, I burn my two ships towards the weaker of the two enemy capital ships to take advantage of their separation instead, catch one and knock it out.

The other one is strong enough that it might be able to take both my ships if it got lucky, so I burn hard for the nearby planet

Slingshotting around, my ships are now screaming towards it head-on & fire missles into it's trajectory crossways as it goes in to follow my ships in the slingshot

Catching it & destroying it with the surprise missles, my ships are now screaming towards the civilian group further out-system that's under attack by yet a third enemy ship

So that's new.

I really want to see this game come to fruition.

## Warping

It would be really interesting if jumps and inertia were decoupled.

Eg. Ship is on one side of the system, enemy on the other. You burn hard to the left perpendicular to the enemy, then warp directly towards them but a bit behind. However your momentum is preserved and now you're in a really advantageous chase position

So much of this games mechanics (at least conceptually) seem to be about trapping opponents in lower momentum states where you can decide whether to catch up to them or get away from them.

Almost exactly like dogfighting in War Thunder, where the higher altitude plane usually has an advantage because it can determine the engagement, but the lower altitude plane has tricks it can use to cause the higher one to overshoot & pull off a surprise win

## Kinetic energy and weapons power

In the dream I didn't think about it, but a screw traveling at orbital speeds can theoretically punch a hole in the ISS.

So the slingshot maneuver to get my ships into a position where they're flying towards the enemy ships at high speed, instead of parallel to or away from them, would increase the power of their kinetic weapons. Relatively speaking the energy of the impacts would be much greater. This could be a way to turn the tides if the enemy is missile/explosive heavy and you're kinetic/ballistic heavy.

### Animation testing

Need to have a way to run animations in-engine without running a full gameplay

### "Tactical Pause"

Need to set up a way for the player to pause the physics, and go into a "future-motion" mode where they can set burns. Animations should still be running, but the speed of physics should slow to 0.05 or something, and the user can drag a handle that indicates a burn direction. From the handle should extend an expected path. The expected path will have to use a lower-fidelity path for performance.

Maybe we can mix the turning as a mechanic the ship has to deal with. Because we're operating in the space of days, the time to rotate to a given direction would be negligible.

## Competition Scope

Interestingly, after some googling around I really didn't find anything that involved actual orbital mechanics, so this could be a whole new niche that we're carving out if I can figure out the core challenges like scale and timeframes.

The scale is such a challenge because the distances are truly vast, like difficult to comprehend vast. Most games skip that by faking a scale that's more manageable. The time-scales too because a space battle might take 10 minutes, but the orbits involved could take days to execute.

## Possible Scenarios

I'm really liking this idea of a real-time tactical puzzle game, where each level is a little vignette with some kind of interesting orbital mechanic at play.

Each could be as simple as getting from Earth-orbit to Lunar-orbit, or as tricky as the three-on-two capital ship fight, or something weird like having to capture something in a horshoe orbit, but where you have so little fuel it's a challenge just to catch up to it.

Level Ideas:

* Apollo - Basic replica of the moon mission, constraints are basically just fuel. Start landed on earth. Get to orbit around moon. Get back to earth without exploding
* Mars 1 - Slightly trickier mission, going from Earth > Mars > Earth. Explores the mechanics of mars being on different or same sides of the system at different times, moving slower than earth, the mechanics of slow = fall faster and speed up = get into wider orbit, basic gravity assist maneuver and high/low-energy positions, as well as thinking about positions as orbit vectors rather than fixed points
* Horshoes - Say an asteroid is in a horshoe orbit with the earth and moon, or sun and jupiter. With constrained fuel (or something) get yourself into a matching orbit so you can capture (hit the same position without exploding) it
* Two-on-Three (name pending) - Dream situation from above

The idea is to teach orbital mechanics while making it interesting, and as a coder to explore the realistic engineering problems of space, like asteroid mining, combat, basic travel
