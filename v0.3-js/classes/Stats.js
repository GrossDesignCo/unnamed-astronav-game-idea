export class Stats {
  constructor() {
    this.frameRate = 0;
    this.lastMaxDist = 0;
    this.timeElapsed = 0;
    this.expanding = false;
  }

  update(dt, space) {
    this.frameRate = `${(1 / dt).toPrecision(2)} fps`;
    this.timeElapsed += dt;

    if (space.maxDist > this.lastMaxDist) {
      this.expanding = 'expanding';
    } else if (space.maxDist < this.lastMaxDist) {
      this.expanding = 'shrinking';
    } else {
      this.expanding = 'stable';
    }

    this.lastMaxDist = space.maxDist;
  }

  draw(view) {
    const ctx = view.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(10, 20);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#fff';

    ctx.fillText(this.frameRate, 0, 0);

    ctx.translate(0, 20);
    ctx.fillText(`Elapsed ${this.timeElapsed.toFixed(2)} Days`, 0, 0);

    ctx.translate(0, 20);
    ctx.fillText(`Size: ${view.maxDist} (${this.expanding})`, 0, 0);
  }
}