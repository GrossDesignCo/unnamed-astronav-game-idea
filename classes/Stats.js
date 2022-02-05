import { formatTime } from '../engine/formats';
export class Stats {
  constructor() {
    // this.frameRate = 0;
    this.lastMaxDist = 0;
    this.timeElapsed = 0;
    // this.expanding = false;
  }

  update(dt, space) {
    // this.frameRate = `${(1 / dt).toPrecision(2)} fps`;
    this.timeElapsed += dt;

    // if (space.maxDist > this.lastMaxDist) {
    //   this.expanding = 'expanding';
    // } else if (space.maxDist < this.lastMaxDist) {
    //   this.expanding = 'shrinking';
    // } else {
    //   this.expanding = 'stable';
    // }

    this.lastMaxDist = space.maxDist;
  }

  draw(view, space) {
    const ctx = view.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(
      view.width - 20 * window.devicePixelRatio,
      (20 + 12) * window.devicePixelRatio
    );

    ctx.fillStyle = '#fff';
    ctx.textAlign = 'right';

    // ctx.fillText(this.frameRate, 0, 0);
    // ctx.translate(0, 20);

    ctx.fillText(`Elapsed: ${formatTime(this.timeElapsed)}`, 0, 0);
    // ctx.translate(0, 20);

    // ctx.fillText(
    //   // `Size: ${space.maxDist.toPrecision(3)}km (${this.expanding})`,
    //   `Size: ${space.maxDist.toPrecision(3)}km`,
    //   0,
    //   0
    // );
  }
}
