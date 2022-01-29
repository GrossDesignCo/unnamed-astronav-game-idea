# Dev Blog #7 & 8

10/16 - 10/30 (2021)

## Balancing Work & Life

Last week I made some progress on the moons of Saturn & rendering rings around a planet based on real data. Then got sidetracked defending something like work-life balance, and so this project got pushed to the side for a few days.

In that spirit, I've roughly re-prioritized this project at about the "Playing video games" level. It makes sense to give this as much attention as is fun and fulfilling, but to keep it at a P2 compared to things like family & the day-job.

## Goals for this week

1. Get up a basic live url to share with peeps who are interested to see what's going on.
2. Solve the delta-time issue. Staring at ridiculously fast spinning objects is only good for motion-sickness :)

And that's it. This week is probably going to be on the busy side, so let's start small.

## Discoveries

Apparently today launched a cool mission to explore Jupiter's Trojans, and NASA released a video of the orbital path their probe is taking to get to both L5 and L6 and fly by a bunch of them.

https://youtu.be/5SphnD95b0c

Other cool missions to check out:

- SOHO
- STEREO

## Double entry this time

This week apparently took two weeks :)

Buuuuuut...

Live URL: https://unnamed-astronav-game-idea.vercel.app/

And it turns out that with small enough delta-time increments, the G offset of `0.086` seems to just, work? That remains an open question, but at least now that we've slowed the envivonment down enough to be stable we can work on other mecchanics.
