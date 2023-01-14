import { StellarBody } from './StellarBody';

/**
 * @param {number} thrust WIP
 * @param {string} type null | 'cargo' | ?
 */
export class Ship extends StellarBody {
  constructor(props) {
    super(props);

    const { type = 'unknown', description } = props;

    this.type = type;
    this.description = `${type}${description ? `; ${description}` : ''}`;

    // + is clockwise, -, counter-clockwise? measured in rotations per day
    this.angularThrust = 0;
  }

  update(dt) {
    this.setAngularV(this.angularV - this.angularThrust);
    super.update(dt);
  }

  drawBody(view) {
    const { ctx } = view;

    const labelX = 30;

    ctx.rotate((this.angle * Math.PI) / 180);

    // Basic Arrow shape
    if (this.type === 'unknown') {
      ctx.beginPath();
      ctx.moveTo(1, -8);
      ctx.lineTo(8, 8);
      ctx.lineTo(2, 6);
      ctx.lineTo(0, 8);
      ctx.lineTo(-2, 6);
      ctx.lineTo(-8, 8);
      ctx.lineTo(-1, -8);
      ctx.closePath();
    }

    // Boxy-ship shape
    if (this.type === 'cargo') {
      ctx.beginPath();
      // draw rght side
      ctx.moveTo(5, -19);
      ctx.lineTo(7, -16);
      ctx.lineTo(8, -4);
      ctx.lineTo(10, -2);
      ctx.lineTo(10, 10);
      ctx.lineTo(8, 12);
      ctx.lineTo(8, 18);
      ctx.lineTo(6, 22);

      // mirror for the left side
      ctx.lineTo(-6, 22);
      ctx.lineTo(-8, 18);
      ctx.lineTo(-8, 12);
      ctx.lineTo(-10, 10);
      ctx.lineTo(-10, -2);
      ctx.lineTo(-8, -4);
      ctx.lineTo(-7, -16);
      ctx.lineTo(-5, -19);
      ctx.closePath();
    }

    ctx.rotate((-1 * this.angle * Math.PI) / 180);

    ctx.strokeStyle = '#555';
    ctx.fillStyle = '#fff';
    ctx.lineWidth = 1;

    ctx.fill();
    ctx.stroke();

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
    if (view.debug) {
      super.drawPhysicsDebugInfo(view);
    }
    if (view.predictPaths) {
      this.drawPredictedPath(view);
    }

    this.drawBody(view);
  }
}
