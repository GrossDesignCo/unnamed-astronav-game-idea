export class View {
  constructor({ canvas, timeScale }) {
    this.canvas = canvas;
    this.scale = 1;
    this.offset = [0, 0];
    this.centerOfMass = [0, 0];
    this.timeScale = timeScale;

    this.resize();
    window.addEventListener('resize', this.resize);

    window.addEventListener('keyup', this.fullscreen);
  }

  resize() {
    if (this.canvas.current) {
      this.canvas.current.width = window.innerWidth;
      this.canvas.current.height = window.innerHeight;
    }
  }

  fullscreen(e) {
    if (e.key === 'f' && (e.ctrlKey || e.metaKey)) {
      this.canvas.requestFullscreen().catch((err) => {
        console.log(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    }
  }

  update(objects) {
    // Figure out the focal points
    let focalPoints = objects.filter((obj) => obj.isFocalPoint);
    if (focalPoints.length === 0) {
      focalPoints = objects;
    }

    // Find the center of mass of all the focal points
    let massSum = 0;
    let massPosSum = [0, 0];

    focalPoints.forEach((source) => {
      massPosSum[0] += source.mass * source.p[0];
      massPosSum[1] += source.mass * source.p[1];
      massSum += source.mass;
    });

    // Center of mass equation:
    // SUM position * mass (of each object) / SUM mass (of each object)
    let centerOfMass = [massPosSum[0] / massSum, massPosSum[1] / massSum];

    // If one focal point, set an arbitrary scale around it for the view

    // TODO: if one focal point, get it's distance from the center of mass of the whole system
    let maxDist = 0;
    if (focalPoints.length === 1) {
      maxDist = focalPoints[0].radius * 5; // Arbitrary zoom level for single focus
    }
    // Otherwise, use the center of mass of the focal points
    // and use the distance of the object furthest away
    else {
      focalPoints.forEach((target) => {
        let dist = 0;
        const dx = target.p[0] - centerOfMass[0];
        const dy = target.p[1] - centerOfMass[1];
        dist = Math.hypot(dx, dy);

        if (dist > maxDist) {
          maxDist = dist;
        }
      });
    }

    // Scale the view
    const smallerAxis = this.height < this.width ? this.height : this.width;
    this.scale = smallerAxis / 2 / maxDist / 1.25;

    // Offset the camera to put the center of mass in the center of the view
    this.offset = [
      centerOfMass[0] * this.scale * -1,
      centerOfMass[1] * this.scale * -1,
    ];
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
