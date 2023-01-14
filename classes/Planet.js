import { StellarBody } from './StellarBody';

export class Planet extends StellarBody {
  constructor(props) {
    super(props);

    const { radius = 1, rings = [] } = props;

    this.radius = radius;
    this.rings = rings;
  }

  drawBody(view) {
    const { ctx } = view;
    const visRadius = this.radius * view.scale;
    const outline = 1.2 + visRadius / 8;
    const labelX = visRadius + outline + 4;

    // Circle for planet body
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff2';
    ctx.lineWidth = outline;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.arc(0, 0, visRadius, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    // Rings
    this.rings.forEach((ring) => {
      const width = (ring[1] - ring[0]) * view.scale;
      const radius = ring[0] * view.scale;
      ctx.strokeStyle = '#555';
      ctx.lineWidth = (ring[1] - ring[0]) * view.scale;
      ctx.beginPath();
      ctx.arc(0, 0, radius + width / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.stroke();
    });

    // Mark an X if dead
    if (this.dead) {
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(-10, -10);
      ctx.moveTo(-10, 10);
      ctx.lineTo(10, -10);
      ctx.closePath();

      ctx.strokeStyle = '#f40028';
      ctx.fillStyle = '#fff';
      ctx.lineWidth = 3;

      ctx.fill();
      ctx.stroke();
    }

    // Label
    if (view.showLabels) {
      if (this.name) {
        ctx.fillStyle = '#fff';
        ctx.fillText(this.name, labelX, 4 * window.devicePixelRatio);
      }
      if (this.description) {
        ctx.fillStyle = '#999';
        ctx.fillText(this.description, labelX, 24 * window.devicePixelRatio);
      }
    }
  }

  // drawVelocity(view) {
  //   const { ctx } = view;
  //   const x = this.v[0] * view.scale;
  //   const y = this.v[1] * view.scale;

  //   ctx.strokeStyle = '#48b068';
  //   ctx.lineWidth = 1;
  //   ctx.fillStyle = '#48b068';

  //   ctx.beginPath();
  //   ctx.moveTo(0, 0);
  //   ctx.lineTo(x, y);
  //   ctx.closePath();

  //   ctx.stroke();

  //   ctx.fillText('V', x, y);
  // }

  // drawAccel(view) {
  //   const { ctx } = view;
  //   const x = this.a[0] * view.scale;
  //   const y = this.a[1] * view.scale;

  //   ctx.strokeStyle = '#ae742d';
  //   ctx.lineWidth = 1;
  //   ctx.fillStyle = '#ae742d';

  //   ctx.beginPath();
  //   ctx.moveTo(0, 0);
  //   ctx.lineTo(x, y);
  //   ctx.closePath();

  //   ctx.stroke();

  //   ctx.fillText('A', x, y);
  // }

  drawPredictedPath(view) {
    const { ctx } = view;

    ctx.beginPath();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#555';

    ctx.moveTo(0, 0);
    let markTime = 0;
    this.predictedPath.forEach((obj, i) => {
      // Get the future point relative to the current object origin
      const px = (obj.p[0] - this.p[0]) * view.scale;
      const py = (obj.p[1] - this.p[1]) * view.scale;

      // The line starts with the real planet, which could be moving,
      // so skip it to preserve just the predicted path points
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }

      // Display a timestamp every 4 days
      if (markTime > 4) {
        ctx.fillText(`Day ${obj.t.toFixed(0)}`, px, py);
        markTime = 0;
      } else {
        markTime += obj.dt;
      }
    });

    ctx.stroke();
  }

  draw(view) {
    super.draw(view);
    super.drawSelection(view);

    if (view.predictPaths) {
      this.drawPredictedPath(view);
    }
    this.drawBody(view);

    super.drawDangerRadii(view);
    if (view.debug) {
      super.drawPhysicsDebugInfo(view);
    }
  }
}
