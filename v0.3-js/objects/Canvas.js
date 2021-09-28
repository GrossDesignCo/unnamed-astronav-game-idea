export class Canvas {
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
    objects.forEach((obj) => {
      objects.forEach((target) => {
        if (!obj.p || !target.p || !obj.mass || !target.mass || obj === target)
          return;

        const dx = obj.p[0] - target.p[0];
        const dy = obj.p[1] - target.p[1];
        const dist = Math.hypot(dx, dy);

        // Scale the canvas to the largest distance
        this.maxDist = dist.toExponential(5);
      });

      if (obj.isFocalPoint) {
        this.offset[0] = this.width / 2 - obj.p[0];
        this.offset[1] = this.height / 2 - obj.p[1];
      }
    });

    const smallerAxis =
      this.canvas.current.height < this.canvas.current.width
        ? this.canvas.current.height
        : this.canvas.current.width;

    this.scale = smallerAxis / 2 / this.maxDist / 1.25;
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
