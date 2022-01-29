export class StellarBody {
  constructor({
    name,
    description,
    pos = [0, 0],
    mass = 1,
    velocity = [0, 0],
    rotationPeriod = 0,
    isFocalPoint = false,
    t = 0,
    dt = 0,
    dangerRadii = [],
  }) {
    this.name = name;
    this.description = description;
    this.mass = mass;
    this.rotationPeriod = rotationPeriod;
    this.isFocalPoint = isFocalPoint;
    this.dangerRadii = dangerRadii;

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
    this.totalA = Math.hypot(...a);
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

  drawDangerRadii(view) {
    const { ctx } = view;

    ctx.strokeStyle = '#a23d3d';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 10]);

    this.dangerRadii.forEach(([radius]) => {
      ctx.beginPath();
      ctx.arc(0, 0, radius * view.scale, 0, Math.PI * 2, true);
      ctx.closePath();

      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  draw(view) {
    const { ctx } = view;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Center + object position
    const x = view.width / 2 + this.p[0] * view.scale + view.offset[0];
    const y = view.height / 2 + this.p[1] * view.scale + view.offset[1];
    ctx.translate(x, y);

    this.drawDangerRadii(view);
  }
}
