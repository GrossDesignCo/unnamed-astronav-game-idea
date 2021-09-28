export class Stats {
  constructor() {
    this.frameRate = 0;
    this.lastMaxDist = 0;
    this.timeElapsed = 0;
  }

  update(dt) {
    this.frameRate = `${(1 / dt).toPrecision(2)} fps`;
    this.timeElapsed += dt;
  }

  draw(space) {
    const expanding = space.maxDist >= this.lastMaxDist;
    this.lastMaxDist = space.maxDist;

    const ctx = space.getCtx();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(10, 20);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#fff';

    ctx.fillText(this.frameRate, 0, 0);

    ctx.translate(0, 20);
    ctx.fillText(`Elapsed ${this.timeElapsed.toFixed(2)} Days`, 0, 0);

    ctx.translate(0, 20);
    ctx.fillText(
      `Size: ${space.maxDist} (${expanding ? 'expanding' : 'shrinking'})`,
      0,
      0
    );
  }
}
