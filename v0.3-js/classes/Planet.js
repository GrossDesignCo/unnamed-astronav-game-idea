const G = 6.674e-11; // kg/m/s
const Gkmd = (G * 86400) / 1000; // kg/km/day

export class Planet {
  constructor({
    name,
    pos = [0, 0],
    mass,
    velocity = [0, 0],
    radius,
    isFocalPoint,
  }) {
    this.name = name;
    this.mass = mass;
    this.radius = radius;
    this.isFocalPoint = isFocalPoint;

    // Acceleration [x, y]
    this.a = [0, 0];
    // Velocity [x, y]
    this.v = velocity;
    // Position [x, y]
    this.p = pos;
    this.predictedPath = [];
  }

  // computeGForce(dt, objects, p = this.p) {
  //   let fx = 0;
  //   let fy = 0;

  //   objects.forEach((obj) => {
  //     if (!obj.mass || !obj.p || obj.name === this.name) return;

  //     const dx = obj.p[0] - p[0]; // x pos
  //     const dy = obj.p[1] - p[1]; // y pos

  //     const dist = Math.hypot(dx, dy);
  //     const distSq = dist * dist;
  //     // const radii = this.radius + obj.radius;
  //     // const radiiSq = radii * radii;

  //     // TODO: Softening based on planet radius
  //     const f = Gkmd * ((obj.mass * this.mass) / distSq);

  //     fx += f * (dx / dist);
  //     fy += f * (dy / dist);
  //   });

  //   const a = [(fx / this.mass) * dt, (fy / this.mass) * dt];

  //   return a;
  // }

  // predictPath(dt, objects) {
  //   const steps = 30;
  //   // Clear the array
  //   this.predictedPath = [];
  //   // Copy current pos
  //   let lastV = [...this.v];
  //   let lastP = [...this.p];

  //   // Get a list of future positions
  //   for (let i = 0; i < steps; i++) {
  //     // Use 1s steps
  //     const a = this.computeGForce(dt, objects, lastP);
  //     const v = [lastV[0] + a[0] * dt, lastV[1] + a[1] * dt];
  //     const p = [lastP[0] + v[0] * dt, lastP[1] + v[1] * dt];

  //     this.predictedPath.push(p);

  //     if (i === 0) {
  //       console.log('Predicted A', this.name, a);
  //       console.log('Predicted V', this.name, v);
  //       console.log('Predicted P', this.name, p);
  //     }
  //     lastV = v;
  //     lastP = p;
  //   }
  // }

  // setAccel(dt, objects) {
  //   // Scale acceleration by deltaTime
  //   this.a = this.computeGForce(dt, objects);
  //   console.log('Computed A', this.name, this.a);
  // }

  setA(a) {
    this.a = a;
  }

  setV(v) {
    this.v = v;
  }

  setP(p) {
    this.p = p;
  }

  // setVelocity(dt) {
  //   // Update velocity with acceleration
  //   this.v = [this.v[0] + this.a[0] * dt, this.v[1] + this.a[1] * dt];
  //   console.log('Computed V', this.name, this.v);
  // }

  // setPos(dt) {
  //   // Update position with velocity
  //   this.p = [this.p[0] + this.v[0] * dt, this.p[1] + this.v[1] * dt];
  //   console.log('Computed P', this.name, this.p);
  // }

  // update(dt) {
  //   this.setVelocity(dt);
  //   this.setPos(dt);
  // }

  drawBody(view) {
    const { ctx } = view;
    const visRadius = this.radius * view.scale;
    const outline = 1.2 + visRadius / 8;
    const labelX = visRadius + outline + 4;

    console.log({ view, visRadius, outline, labelX });

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

    ctx.fillText(this.name, labelX, 4);
  }

  drawVelocity(view) {
    const { ctx } = view;
    const x = this.v[0] * view.scale;
    const y = this.v[1] * view.scale;

    ctx.strokeStyle = '#48b068';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#48b068';

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.closePath();

    ctx.stroke();

    ctx.fillText('V', x, y);
  }

  drawAccel(view) {
    const { ctx } = view;
    const x = this.a[0] * view.scale;
    const y = this.a[1] * view.scale;

    ctx.strokeStyle = '#ae742d';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#ae742d';

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.closePath();

    ctx.stroke();

    ctx.fillText('A', x, y);
  }

  drawPredictedPath(view) {
    const { ctx } = view;

    ctx.beginPath();
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#aaa';

    ctx.moveTo(0, 0);
    this.predictedPath.forEach((obj, i) => {
      // Get the future point relative to the current object origin
      const px = (obj.p[0] - this.p[0]) * view.scale;
      const py = (obj.p[1] - this.p[1]) * view.scale;

      ctx.lineTo(px, py);
      // ctx.fillText(i, px, py);
    });

    ctx.stroke();
  }

  draw(view) {
    const { ctx } = view;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Center + object position
    const x = view.width / 2 + this.p[0] * view.scale;
    const y = view.height / 2 + this.p[1] * view.scale;
    ctx.translate(x, y);

    // Draw stable orbit (goal)
    // ctx.strokeStyle = 'lightblue';
    // ctx.lineWidth = 1;

    // ctx.beginPath();
    // ctx.arc(
    //   Math.abs(this.p[0]) * view.scale * -1,
    //   0,
    //   Math.abs(this.p[0]) * view.scale,
    //   0,
    //   Math.PI * 2,
    //   true
    // );
    // ctx.closePath();

    // ctx.stroke();

    // this.drawAccel(view);
    // this.drawVelocity(view);
    this.drawPredictedPath(view);
    this.drawBody(view);
  }
}
