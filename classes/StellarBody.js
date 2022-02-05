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
    angle = 0,
    selected = false,
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
    this.angle = angle;
    this.selected = selected;
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

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  update(dt) {
    // Do one full rotation counter-clockwis based on the rotational period
    this.angle = this.angle - (360 / this.rotationPeriod) * dt;
  }

  draw(view) {
    const { ctx } = view;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Center + object position
    const x = view.toViewXCoords(this.p[0]);
    const y = view.toViewYCoords(this.p[1]);
    ctx.translate(x, y);
  }

  drawDangerRadii(view) {
    const { ctx } = view;

    ctx.strokeStyle = '#f40028';
    ctx.lineWidth = 1;
    ctx.setLineDash([16, 4]);

    this.dangerRadii.forEach(([radius]) => {
      ctx.beginPath();
      ctx.arc(0, 0, radius * view.scale, 0, Math.PI * 2, true);
      ctx.closePath();

      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  drawSelection(view) {
    const { ctx } = view;

    ctx.strokeStyle = '#20a6ff';

    // Main box
    ctx.setLineDash([10, 20, 10, 0]);

    ctx.beginPath();
    ctx.rect(-20, -20, 40, 40);
    ctx.closePath();

    ctx.stroke();

    // Blur effect
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#20a6ff99';
    ctx.filter = 'blur(4px)';
    ctx.setLineDash([10, 20, 10, 0]);

    ctx.beginPath();
    ctx.rect(-20, -20, 40, 40);
    ctx.closePath();

    ctx.stroke();

    // Remove special effects gain
    ctx.filter = 'blur(0)';
    ctx.setLineDash([]);
  }
}
