import { Planet } from './Planet';

const G = 6.674e-11; // kg/m/s
const Gkmd = (G * 86400) / 1000; // kg/km/day

export class Space {
  constructor({ timeScale }) {
    this.offset = [0, 0];
    this.timeScale = timeScale;
    this.maxDist = 0;
  }

  // Look into offloading these calculations to a GPU (gpu.js?)
  // Look into Runge-Kutaa Method for derivative calculations
  // - https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods
  computeUpdatedVectors(source, objects, dt) {
    let fx = 0;
    let fy = 0;
    let maxDist = 0;

    objects.forEach((target) => {
      if (!target.p || !target.mass || source.name === target.name) return;

      const dx = target.p[0] - source.p[0];
      const dy = target.p[1] - source.p[1];
      const dist = Math.hypot(dx, dy);
      const distSq = dist * dist;

      // When dt is small, G is too low, increase G
      // When dt is large, G is too high, decrease G
      const f = Gkmd * ((source.mass * target.mass) / distSq);

      fx += f * (dx / dist);
      fy += f * (dy / dist);

      // Scale the canvas to the largest distance
      if (dist > maxDist) {
        maxDist = dist.toExponential(5);
      }
    });

    const a = [(fx / source.mass) * dt, (fy / source.mass) * dt];
    const v = [source.v[0] + a[0] * dt, source.v[1] + a[1] * dt];
    const p = [source.p[0] + v[0] * dt, source.p[1] + v[1] * dt];

    return {
      f: [fx, fy],
      a,
      v,
      p,
      maxDist,
    };
  }

  update(dt, objects) {
    // Set new real position of objects
    objects.forEach((obj) => {
      if (!obj.p || !obj.mass || !obj.predictedPath) return;

      const { v, p, maxDist } = this.computeUpdatedVectors(obj, objects, dt);

      obj.v = v;
      obj.p = p;

      this.maxDist = maxDist;
    });

    // Compute positions for the next 30 seconds/days
    const steps = 30;

    for (let i = 0; i < steps; i++) {
      objects.forEach((obj) => {
        if (!obj.predictedPath) return;

        // Start with current object, then traverse down generated path
        const nextSource = i === 0 ? obj : obj.predictedPath[i - 1];
        const nextObjects = objects.map((obj) =>
          i === 0 ? obj : obj.predictedPath[i - 1]
        );
        console.log({ nextSource, nextObjects });
        const { v, p } = this.computeUpdatedVectors(
          nextSource,
          nextObjects,
          0.1
        );

        // Runge-Kutta, figure out the derivative of the gravity function
        // Use 1s steps
        // const k1 = this.computeUpdatedVectors(nextSource, nextObjects, 1);
        // const pk1 = new Planet({
        //   velocity: k1.v,
        //   pos: k1.p,
        //   mass: obj.mass,
        // });
        // const k2 = this.computeUpdatedVectors(nextSource, nextObjects, 1 * 0.5);
        // const pk2 = new Planet({
        //   velocity: k2.v,
        //   pos: k2.p,
        //   mass: obj.mass,
        // });
        // const k3 = this.computeUpdatedVectors(nextSource, nextObjects, 1 * 0.5);
        // const pk3 = new Planet({
        //   velocity: k3.v,
        //   pos: k3.p,
        //   mass: obj.mass,
        // });
        // const k4 = this.computeUpdatedVectors(nextSource, nextObjects, 2);

        // const v = [
        //   (1 / 6) * 0.1 * k1.v[0] + 2 * (k2.v[0] + k3.v[0]) + k4.v[0],
        //   (1 / 6) * 0.1 * k1.v[1] + 2 * (k2.v[1] + k3.v[1]) + k4.v[1],
        // ];
        // const p = [
        //   (1 / 6) * 0.1 * k1.p[0] + 2 * (k2.p[0] + k3.p[0]) + k4.p[0],
        //   (1 / 6) * 0.1 * k1.p[1] + 2 * (k2.p[1] + k3.p[1]) + k4.p[1],
        // ];

        obj.predictedPath[i] = new Planet({
          velocity: v,
          pos: p,
          mass: obj.mass,
          name: `${obj.name}-${i}`,
        });
        // console.log({
        //   k1,
        //   k2,
        //   k3,
        //   k4,
        //   new: obj.predictedPath[i],
        // });
      });
    }
  }
}
