export class Canvas {
  constructor({ canvas, timeScale }) {
    this.canvas = canvas;
    this.ctx = canvas.current.getContext('2d');
    this.scale = 0;
    this.offset = {
      x: 0,
      y: 0,
    };
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
        if (
          !obj.pos ||
          !target.pos ||
          !obj.mass ||
          !target.mass ||
          obj === target
        )
          return;

        const dx = obj.pos.x - target.pos.x;
        const dy = obj.pos.y - target.pos.y;
        const dist = Math.hypot(dx, dy);

        // Scale the canvas to the largest distance
        if (dist > this.maxDist) this.maxDist = dist.toExponential(5);
      });

      if (obj.isFocalPoint) {
        this.offset.x = this.getWidth() / 2 - obj.pos.x;
        this.offset.y = this.getHeight() / 2 - obj.pos.y;
      }
    });

    this.scale = this.canvas.current.height / 2 / this.maxDist / 1.25;
  }

  getCtx() {
    return this.ctx;
  }

  getWidth() {
    return this.canvas.current.width;
  }

  getHeight() {
    return this.canvas.current.height;
  }
}
