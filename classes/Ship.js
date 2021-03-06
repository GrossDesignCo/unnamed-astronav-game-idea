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
  }

  draw(view) {
    super.draw(view);
    const { ctx } = view;

    const labelX = 30;

    ctx.fillStyle = '#fff';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;

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

    ctx.fill();

    ctx.rotate((-1 * this.angle * Math.PI) / 180);

    // Label
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
