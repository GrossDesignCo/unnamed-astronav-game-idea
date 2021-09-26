export class Stats {
  constructor() {
    this.frameRate = 0;
  }

  update(dt) {
    this.frameRate = `${(1 / dt).toPrecision(2)} fps`;
  }

  draw(space) {
    const ctx = space.getCtx();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(10, 20);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#fff';

    ctx.fillText(this.frameRate, 0, 0);
  }
}
