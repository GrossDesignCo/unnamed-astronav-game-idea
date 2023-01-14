import { StellarBody } from './StellarBody';

const G = 6.674e-11; // kg/m/s
const Gkmd = (G * 86400) / 1000; // kg/km/day

export class Space {
  constructor({ timeScale }) {
    this.timeScale = timeScale;
  }

  computeRawGForce(source, objects, dt) {
    let ax = 0;
    let ay = 0;

    objects.forEach((target) => {
      if (!target || !target.p || !target.mass || source.name === target.name)
        return;

      // Inputs
      const dx = target.p[0] - source.p[0];
      const dy = target.p[1] - source.p[1];
      const dist = Math.hypot(dx, dy);
      const distSq = dist * dist;

      // When dt is small, G is too low, increase G
      // When dt is large, G is too high, decrease G
      const f = (Gkmd * target.mass * 0.086) / distSq;

      // Break force into x/y components
      ax += f * (dx / dist);
      ay += f * (dy / dist);
    });

    return [ax, ay];
  }

  // Look into offloading these calculations to a GPU (gpu.js?)
  // Runge-Kutta RK4 Method for derivative calculations
  // - https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods
  computeUpdatedVectors(source, objects, dt) {
    // k1
    const p1 = source.p;
    const v1 = source.v;
    const a1 = this.computeRawGForce(source, objects, dt);

    // k2
    const p2 = [p1[0] + v1[0] * 0.5 * dt, p1[1] + v1[1] * 0.5 * dt];
    const v2 = [v1[0] + a1[0] * 0.5 * dt, v1[1] + a1[1] * 0.5 * dt];
    const a2 = this.computeRawGForce(
      { p: p2, mass: source.mass, name: source.name },
      objects,
      dt * 1.5
    );

    // k3
    const p3 = [p1[0] + v2[0] * 0.5 * dt, p1[1] + v2[1] * 0.5 * dt];
    const v3 = [v1[0] + a2[0] * 0.5 * dt, v1[1] + a2[1] * 0.5 * dt];
    const a3 = this.computeRawGForce(
      { p: p3, mass: source.mass, name: source.name },
      objects,
      dt * 1.5
    );

    // k4
    const p4 = [p1[0] + v3[0] * dt, p1[1] + v3[1] * dt];
    const v4 = [v1[0] + a3[0] * dt, v1[1] + a3[1] * dt];
    const a4 = this.computeRawGForce(
      { p: p4, mass: source.mass, name: source.name },
      objects,
      dt * 2
    );

    // weighted averate of k1-4 for both position & velocity
    const p = [
      p1[0] + (dt / 6) * (v1[0] + 2 * v2[0] + 2 * v3[0] + v4[0]),
      p1[1] + (dt / 6) * (v1[1] + 2 * v2[1] + 2 * v3[1] + v4[1]),
    ];
    const v = [
      v1[0] + (dt / 6) * (a1[0] + 2 * a2[0] + 2 * a3[0] + a4[0]),
      v1[1] + (dt / 6) * (a1[1] + 2 * a2[1] + 2 * a3[1] + a4[1]),
    ];
    const a = [
      (dt / 6) * (a1[0] + 2 * a2[0] + 2 * a3[0] + a4[0]),
      (dt / 6) * (a1[1] + 2 * a2[1] + 2 * a3[1] + a4[1]),
    ];

    return {
      p,
      v,
      a,
    };
  }

  update(dt, objects) {
    // Set new real position of objects
    objects.forEach((obj) => {
      if (!obj.p || !obj.mass || !obj.predictedPath) return;

      const { v, p, a } = this.computeUpdatedVectors(obj, objects, dt);

      obj.setV(v);
      obj.setP(p);
      obj.setA(a);

      this.detectCollisions(obj, objects);
    });
  }

  predictPaths(dt, objects, steps) {
    for (let i = 0; i < steps; i++) {
      objects.forEach((obj) => {
        if (!obj.predictedPath || obj.dead) return;

        if (i === 0) {
          // clear out old predicted path
          obj.resetPredictedPath();
        }

        // Start with current object, then traverse down generated path
        const nextSource = i === 0 ? obj : obj.predictedPath[i - 1];
        const nextObjects = objects.map((obj) =>
          i === 0 ? obj : obj.predictedPath[i - 1]
        );
        const { v, p } = this.computeUpdatedVectors(
          nextSource,
          nextObjects,
          dt
        );

        // Create a fake "planet" at each new position to represent each
        // future step of the sim
        obj.predictedPath[i] = new StellarBody({
          velocity: v,
          pos: p,
          mass: obj.mass,
          name: `${obj.name}-${i}`,
          t: nextSource.t + dt,
          dt: dt,
        });
      });
    }
  }

  detectCollisions(source, objects) {
    objects.forEach((obj) => {
      const dx = obj.p[0] - source.p[0];
      const dy = obj.p[1] - source.p[1];
      const dist = Math.hypot(dx, dy);

      if (obj.radius && source.name !== obj.name && dist < obj.radius * 1.6) {
        console.log('explode', source);

        if (source.explode) {
          source.explode();
        }
      }
    });
  }
}
