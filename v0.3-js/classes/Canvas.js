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

  update(objects, space) {
    this.setOffset(objects);
    this.setScale(space);
  }

  setOffset(objects) {
    objects.forEach((obj) => {
      if (obj.isFocalPoint) {
        this.offset[0] = this.width / 2 - obj.p[0];
        this.offset[1] = this.height / 2 - obj.p[1];
      }
    });
  }

  setScale(space) {
    const smallerAxis =
      this.canvas.current.height < this.canvas.current.width
        ? this.canvas.current.height
        : this.canvas.current.width;

    this.scale = smallerAxis / 2 / space.maxDist / 1.25;
    console.log('scale:', this.scale, smallerAxis, space.maxDist);
  }

  render(objects, stats) {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.save();

    objects.forEach((obj) => {
      obj.draw(this);
    });
    stats.draw(this);

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
