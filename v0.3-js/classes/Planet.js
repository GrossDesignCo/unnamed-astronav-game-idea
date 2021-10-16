const totalVector = (v) => {
  return Math.hypot(v[0], v[1]);
};

export class Planet {
  constructor({
    name,
    pos = [0, 0],
    mass = 1,
    velocity = [0, 0],
    radius = 1,
    rotationPeriod = 0,
    rings = [],
    isFocalPoint = false,
    t = 0,
    dt = 0,
  }) {
    this.name = name;
    this.mass = mass;
    this.radius = radius;
    this.rotationPeriod = rotationPeriod;
    this.rings = rings;
    this.isFocalPoint = isFocalPoint;

    // Used if predicting a path, total time ahead of now,
    this.t = t;
    // And time ahead of previous step
    this.dt = dt;

    // Acceleration [x, y]
    this.a = [0, 0];
    this.totalA = 1;
    // Velocity [x, y]
    this.v = velocity;
    // Position [x, y]
    this.p = pos;
    this.predictedPath = [];
    // Angle relative to x axis
    this.angle = 0;
  }

  setA(a) {
    this.a = a;
    this.totalA = totalVector(a);
  }

  setV(v) {
    this.v = v;
  }

  setP(p) {
    this.p = p;
  }

  update(dt) {
    // Do one full rotation counter-clockwis based on the rotational period
    this.angle = this.angle - (360 / this.rotationPeriod) * dt;
  }

  drawBody(view) {
    const { ctx } = view;
    const visRadius = this.radius * view.scale;
    const outline = 1.2 + visRadius / 8;
    const labelX = visRadius + outline + 4;

    // Circle for planet body
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff2';
    ctx.lineWidth = outline;
    ctx.lineCap = 'round';
    // console.log({ visRadius, outline, labelX });

    ctx.beginPath();
    ctx.arc(0, 0, visRadius, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    // Dot for rotation
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.moveTo(visRadius * 0.75, 0);
    ctx.lineTo(visRadius * 0.75, 0);
    ctx.stroke();
    ctx.rotate((-1 * this.angle * Math.PI) / 180);

    // Rings
    this.rings.forEach((ring) => {
      const width = (ring[1] - ring[0]) * view.scale;
      const radius = ring[0] * view.scale;
      ctx.strokeStyle = '#333';
      ctx.lineWidth = (ring[1] - ring[0]) * view.scale;
      ctx.beginPath();
      ctx.arc(0, 0, radius + width / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.stroke();
    });

    // Label
    ctx.font = '12px Menlo, monospace';
    ctx.fillStyle = '#fff';

    ctx.fillText(this.name, labelX, 4);
  }

  // drawVelocity(view) {
  //   const { ctx } = view;
  //   const x = this.v[0] * view.scale;
  //   const y = this.v[1] * view.scale;

  //   ctx.strokeStyle = '#48b068';
  //   ctx.lineWidth = 1;
  //   ctx.fillStyle = '#48b068';

  //   ctx.beginPath();
  //   ctx.moveTo(0, 0);
  //   ctx.lineTo(x, y);
  //   ctx.closePath();

  //   ctx.stroke();

  //   ctx.fillText('V', x, y);
  // }

  // drawAccel(view) {
  //   const { ctx } = view;
  //   const x = this.a[0] * view.scale;
  //   const y = this.a[1] * view.scale;

  //   ctx.strokeStyle = '#ae742d';
  //   ctx.lineWidth = 1;
  //   ctx.fillStyle = '#ae742d';

  //   ctx.beginPath();
  //   ctx.moveTo(0, 0);
  //   ctx.lineTo(x, y);
  //   ctx.closePath();

  //   ctx.stroke();

  //   ctx.fillText('A', x, y);
  // }

  drawPredictedPath(view) {
    const { ctx } = view;

    ctx.beginPath();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.font = '12px Menlo, monospace';
    ctx.fillStyle = '#555';

    ctx.moveTo(0, 0);
    let markTime = 0;
    this.predictedPath.forEach((obj, i) => {
      // Get the future point relative to the current object origin
      const px = (obj.p[0] - this.p[0]) * view.scale;
      const py = (obj.p[1] - this.p[1]) * view.scale;

      ctx.lineTo(px, py);

      // Display a timestamp every 4 days
      if (markTime > 4) {
        ctx.fillText(`Day ${obj.t.toFixed(1)}`, px, py);
        markTime = 0;
      } else {
        markTime += obj.dt;
      }
    });

    ctx.stroke();
  }

  draw(view) {
    const { ctx } = view;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Center + object position
    const x = view.width / 2 + this.p[0] * view.scale + view.offset[0];
    const y = view.height / 2 + this.p[1] * view.scale + view.offset[1];
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
