# Asteroid

Ideas:

- Low-poly geometry instead of a circle
- always show at least one pixel to get a neat cloud of particles effect?
- uneven mass (at some point, figure out how)
- different/uneven libido/reflectivities (maybe per polygon?)
- would probably need to be generated on load

Might need some kind of collision physics, depending on how close they get?

## Dark Asteroids

Not all asteroids and comets in our system are known/catalogued, so it makes sense that as the AI flies around it's going to encounter surprises, namely, asteroids (or maybe even whole planets) that for whatever reason weren't on it's navigational data. We can simulate that by feeding partial data into it's knowledge-base, but using the complete data for physics calculations. Over time the ship routes will get bent by real gravity, giving the AIs hints as to where undiscovered bodies are located
