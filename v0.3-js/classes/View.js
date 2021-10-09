export class View {
  constructor({ canvas, timeScale }) {
    this.canvas = canvas;
    this.scale = 1;
    this.offset = [0, 0];
    this.timeScale = timeScale;
    this.maxDist = 0;

    this.resize();
    window.addEventListener('resize', this.resize);
  }

  resize() {
    if (this.canvas.current) {
      this.canvas.current.width = window.innerWidth;
      this.canvas.current.height = window.innerHeight;
    }
  }

  update(objects) {
    const smallerAxis =
      this.canvas.current.height < this.canvas.current.width
        ? this.canvas.current.height
        : this.canvas.current.width;

    let maxDist = 0;
    let centerOfGravity = [0, 0];

    let focalPoints = objects.filter((obj) => obj.isFocalPoint);
    if (focalPoints.length === 0) {
      focalPoints = objects;
    }

    focalPoints.forEach((source) => {
      focalPoints.forEach((target) => {
        if (source.isFocalPoint && target.isFocalPoint) {
          let dist = 0;
          // use the object's size and position
          // if there winds up being only one focal point
          if (source.name === target.name) {
            dist = source.radius * 2;
            centerOfGravity = source.p;
          } else {
            const dx = target.p[0] - source.p[0];
            const dy = target.p[1] - source.p[1];
            dist = Math.hypot(dx, dy);

            // TODO: center of gravity with multiple focal points
            // Center of mass relative to the source point
            const massRatio = source.mass / target.mass;
          }

          if (dist > maxDist) {
            maxDist = dist;
          }
        }
      });
    });

    this.maxDist = maxDist;

    this.scale = smallerAxis / 2 / this.maxDist / 1.25;
    // this.offset = [
    //   centerOfGravity[0] * this.scale * -1,
    //   centerOfGravity[1] * this.scale * -1,
    // ];
  }

  render(objects, space, stats) {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.save();

    const x = this.offset[0] * -1;
    const y = this.offset[1] * -1;
    ctx.translate(x, y);

    objects.forEach((obj) => {
      obj.draw(this);
    });
    if (stats) {
      stats.draw(this, space);
    }

    ctx.restore();
  }

  get ctx() {
    return this.canvas.current.getContext('2d');
  }

  get width() {
    return this.canvas.current.width;
  }

  get height() {
    return this.canvas.current.height;
  }
}
