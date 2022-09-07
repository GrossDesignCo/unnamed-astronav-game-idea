# August

Lost momentum for a while there. I've been wanting to come back to this project, especially now that it's getting interesting. The main blocker has been work & brainpower. Long-story short, Jury Duty and multiple illnesses took up 6-7 weeks of the first two quarters, and my ability to work remote for Tesla was under threat for a couple months and most of my team was either laid off or found other work that would let them go remote, so I became the team lead and have been really heads down on rebuilding that space.

Lord-willing I'll be able to set aside a little time this month to work on this project. Maybe another 1-2 day hackathon that doesn't get eaten up by jury duty like the February one did.

## Short hit-list of small things to work on

- Frame rate drop on selection. I learned that this is likely cause by the dynamic addition/removal of properties in JavaScript, so it should be pretty easy to pre-define those keys & create get/set methods around them. Incidentally I also learned that statically shaping objects like that is one of the bit performance gotchas in JS :)
- Rotation for ship, give it a configurable "rotation thrust" attribute dictating how fast it can turn itself around. Get it to face a specific planet as it orbits
  - rotational momentum as well, keeps rotating until opposite thrust applied
- directional thrust, apply a given force along the ships y axis (rotated by whatever it's rotation is)
- Add a little transparency to predicted paths to make it easier to see where they overlap
- Add some angular caps to button styles to make them look cooler :)
- Maybe do some learning on basic neural network dev

Once those two things are done, that should be all we need before starting to write an ML script that finds a stable orbit!! :)

Also neat, I found a 3d map of Starlink satellite positions:
https://satellitemap.space/#

## Actual Progress

I remembered that I had a collision detection branch in progress & decided to finish that out. The rest of this month went towards mental health & re-learning how to take breaks for the 15th time :)

But now there's a couple ships on the Earth-Moon system, one of which crashes directly into the Earth and it's inevitable demise.
