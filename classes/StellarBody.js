export class StellarBody {
  constructor({
    name,
    description,
    accel = [0, 0],
    thrust = [0, 0],
    predictedThrust = [0, 0],
    pos = [0, 0],
    mass = 1,
    velocity = [0, 0],
    angularV = 0,
    isFocalPoint = false,
    t = 0,
    dt = 0,
    dangerRadii = [],
    angle = 0,
    rotationPeriod = 0,
    selected = false,
    dead = false,
  }) {
    this.name = name;
    this.description = description;
    this.mass = mass;
    this.angularV = angularV || 1 / rotationPeriod;
    this.isFocalPoint = isFocalPoint;
    this.dangerRadii = dangerRadii;

    // Used if predicting a path, total time ahead of now,
    this.t = t;
    // And time ahead of previous step
    this.dt = dt;

    // Acceleration [x, y]
    this.a = accel;
    this.totalA = 1;
    this.predictedThrust = predictedThrust;
    this.thrust = thrust;
    // Velocity [x, y]
    this.v = velocity;
    // Position [x, y]
    this.p = pos;
    this.predictedPath = [];
    // Angle relative to x axis
    this.angle = angle;
    this.selected = selected;
    this.dead = dead;
  }

  resetPredictedPath() {
    this.predictedPath = [];
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

  setPredictedThrust(x, y) {
    this.predictedThrust = [x, y];
  }

  setThrust(x, y) {
    this.thrust = [x, y];
  }

  commitThrust() {
    this.setThrust(...this.predictedThrust);

    console.log('Commit thrust', this.name, this.predctedThrust, this.thrust);
  }

  setAngularV(v) {
    this.angularV = v;
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
    console.log('deselect', this.name);
  }

  explode() {
    this.a = [0, 0];
    this.v = [0, 0];
    this.mass = 0;
    this.dead = true;
    this.resetPredictedPath();
  }

  update(dt) {
    // Convert revolutions / day into degrees / day
    this.angle = this.angle - this.angularV * 360 * dt;
  }

  draw(view) {
    const { ctx } = view;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Center + object position
    const [x, y] = view.toViewCoords(this.p);
    ctx.translate(x, y);
  }

  drawPhysicsDebugInfo(view) {
    const { ctx } = view;

    // Mark for rotation
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'green';

    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -50);
    ctx.closePath();
    ctx.stroke();
    ctx.rotate((-1 * this.angle * Math.PI) / 180);
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

  // For some reason this method is harsh on performance
  drawSelection(view) {
    if (this.selected) {
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
}
