const G = 6.674e-11; // kg/m/s
const Gkmd = (G * 86400) / 1000; // kg/km/day

export class Planet {
  constructor({ name, pos, mass, velocity, radius, isFocalPoint }) {
    this.name = name;
    this.mass = mass;
    this.radius = radius;
    this.isFocalPoint = isFocalPoint;

    // Position [x, y]
    this.p = pos;
    // Velocity [x, y]
    this.v = velocity;
    // Acceleration [x, y]
    this.a = [0, 0];
    this.predictedPath = [];
  }

  computeGForce(dt, objects, p = this.p) {
    let fx = 0;
    let fy = 0;

    objects.forEach((obj) => {
      if (!obj.mass || !obj.p || obj === this) return;

      const dx = obj.p[0] - p[0]; // x pos
      const dy = obj.p[1] - p[1]; // y pos

      const dist = Math.hypot(dx, dy);
      const distSq = dist * dist;
      const radii = this.radius + obj.radius;
      const radiiSq = radii * radii;

      // TODO: Softening based on planet radius
      const f = (Gkmd * obj.mass * this.mass) / (distSq + radiiSq);

      fx += f * (dx / dist);
      fy += f * (dy / dist);
    });

    const ax = (fx / this.mass) * dt;
    const ay = (fy / this.mass) * dt;

    return [ax, ay];
  }

  predictPath(objects) {
    const steps = 30;
    // Clear the array
    this.predictedPath = [];
    // Copy current pos
    let lastV = [...this.v];
    let lastP = [...this.p];

    // Get a list of future positions
    for (let i = 0; i < steps; i++) {
      // Use 1s steps
      const a = this.computeGForce(1, objects, lastP);
      const v = [lastV[0] + a[0], lastV[1] + a[1]];
      const p = [lastP[0] + v[0], lastP[1] + v[1]];

      this.predictedPath.push(p);
      lastV = v;
      lastP = p;
    }
  }

  setAccel(dt, objects) {
    // Scale acceleration by deltaTime
    this.a = this.computeGForce(dt, objects);
  }

  setVelocity(dt) {
    // Update velocity with acceleration
    this.v[0] += this.a[0] * dt;
    this.v[1] += this.a[1] * dt;
  }

  setPos(dt) {
    // Update position with velocity
    this.p[0] += this.v[0] * dt;
    this.p[1] += this.v[1] * dt;
  }

  update(dt) {
    this.setVelocity(dt);
    this.setPos(dt);
  }

  drawBody(space) {
    const ctx = space.ctx;
    const visRadius = this.radius * space.scale;
    const outline = 1.2 + visRadius / 8;

    // Circle for planet body
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff2';
    ctx.lineWidth = outline;

    ctx.beginPath();
    ctx.arc(0, 0, visRadius, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    // Label
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#fff';

    ctx.translate(visRadius + outline + 4, 4);
    ctx.fillText(this.name, 0, 0);
    // End back at origin
    ctx.translate(visRadius + outline + 4, 4);
  }

  drawPredictedPath(space) {
    const ctx = space.ctx;

    this.predictedPath.forEach(([x, y]) => {
      ctx.lineTo(x * space.scale, y * space.scale);
    });

    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  draw(space) {
    const ctx = space.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Center + object position
    const x = space.width / 2 + this.p[0] * space.scale;
    const y = space.height / 2 + this.p[1] * space.scale;
    ctx.translate(x, y);

    this.drawBody(space);
    this.drawPredictedPath(space);
  }
}
