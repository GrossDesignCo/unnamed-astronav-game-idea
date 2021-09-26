export class Planet {
  constructor({ name, pos, mass, velocity, radius, isFocalPoint }) {
    this.name = name;
    this.pos = pos;
    this.mass = mass;
    this.velocity = velocity;
    this.radius = radius;
    this.isFocalPoint = isFocalPoint;
    this.netGForce = {
      x: 0,
      y: 0,
    };
    this.accel = {
      x: 0,
      y: 0,
    };
    console.log('Test', this);
  }

  computeNetGForceFrom(objects) {
    // resolve gravity/etc.
    let fx = 0;
    let fy = 0;

    objects.forEach((obj) => {
      if (!obj.computeNetGForceFrom || obj === this) return;

      // compute force of gravity against this object
      // kilometers to meters

      // Hypotenue: a^2 + b^2 = c^2

      // moon (3) - earth (0) * 1000 = 3000
      const dx = obj.pos.x - this.pos.x;
      // moon (4) - earth (0) * 1000 = 4000
      const dy = obj.pos.y - this.pos.y;

      // hypot: 3000, 4000 = 5000
      const dist = Math.hypot(dx, dy);

      // G * moon (10) * earth (1000) / 5000 * 5000 = 2.6696e-14
      const f = (6.674e-11 * obj.mass * this.mass) / (dist * dist);

      // Break force down into x & y
      // Math.cos((state.rotation - 90) * (Math.PI / 180));

      // Get Y force from Hyp and X dist

      // 10 * (3 / 5) = 6
      // Fx = f * (dx / dist)
      // 10 * (4 / 5) = 8
      // Fy = f * (dy / dist)

      // HOPEFULLY RIGHT MATH
      fx += f * (dx / dist);
      fy += f * (dy / dist);

      // WRONG MATH (basic proportions)
      // 2.6696e-14 * (3000 / (3000 + 4000)) = 1.1441143e-14
      // fx += f * (dx / (Math.abs(dx) + Math.abs(dy)));
      // 2.6696e-14 * (4000 / (3000 + 4000)) = 1.5254857e-14
      // fy += f * (dy / (Math.abs(dx) + Math.abs(dy)));

      // console.log({
      //   name: this.name,
      //   obj: obj.name,
      //   dx,
      //   dy,
      //   dist,
      //   f,
      //   fx,
      //   fy,
      // });
    });

    this.netGForce.x = fx;
    this.netGForce.y = fy;
  }

  update(dt, space) {
    // Scale acceleration by deltaTime
    this.accel.x = this.netGForce.x / this.mass;
    this.accel.y = this.netGForce.y / this.mass;

    // Update velocity with acceleration
    this.velocity.x += this.accel.x;
    this.velocity.y += this.accel.y;

    // Update position with velocity
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  draw(space) {
    const ctx = space.getCtx();
    // reset
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // start from center
    ctx.translate(space.getWidth() / 2, space.getHeight() / 2);
    ctx.translate(this.pos.x * space.scale, this.pos.y * space.scale);

    // Styles
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff2';
    ctx.lineWidth = (this.radius * space.scale) / 5;

    // Draw
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * space.scale, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  }
}
