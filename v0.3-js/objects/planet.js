const G = 6.674e-11; // kg/m/s
const Gkmd = (G * 86400) / 1000; // kg/km/day
export class Planet {
  constructor({ name, pos, mass, velocity, radius, isFocalPoint }) {
    this.name = name;
    this.pos = pos;
    this.mass = mass;
    this.velocity = velocity;
    this.radius = radius;
    this.isFocalPoint = isFocalPoint;
    this.accel = {
      x: 0,
      y: 0,
    };
  }

  computeAccel(dt, objects) {
    // resolve gravity/etc.
    let fx = 0;
    let fy = 0;

    objects.forEach((obj) => {
      if (!obj.computeAccel || obj === this) return;

      const dx = obj.pos.x - this.pos.x;
      const dy = obj.pos.y - this.pos.y;

      const dist = Math.hypot(dx, dy);
      const distSq = dist * dist;
      const radii = this.radius + obj.radius;
      const radiiSq = radii * radii;

      // TODO: Softening based on planet radius
      const f = (Gkmd * obj.mass * this.mass) / (distSq + radiiSq);

      fx += f * (dx / dist);
      fy += f * (dy / dist);
    });

    // Scale acceleration by deltaTime
    this.accel.x = (fx / this.mass) * dt;
    this.accel.y = (fy / this.mass) * dt;
  }

  update(dt) {
    // Update velocity with acceleration
    this.velocity.x += this.accel.x * dt;
    this.velocity.y += this.accel.y * dt;

    // Update position with velocity
    this.pos.x += this.velocity.x * dt;
    this.pos.y += this.velocity.y * dt;
  }

  draw(space) {
    const ctx = space.getCtx();
    const visRadius = this.radius * space.scale;
    const outline = 2 + visRadius / 8;
    // reset
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // start from center
    ctx.translate(space.getWidth() / 2, space.getHeight() / 2);
    ctx.translate(this.pos.x * space.scale, this.pos.y * space.scale);

    // Styles
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff2';
    ctx.lineWidth = outline;

    // Draw
    ctx.beginPath();
    ctx.arc(0, 0, visRadius, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    ctx.translate(visRadius + outline + 4, 4);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#fff';

    ctx.fillText(this.name, 0, 0);
  }
}
