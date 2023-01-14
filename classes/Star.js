import { StellarBody } from './StellarBody';

export class Star extends StellarBody {
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
    ctx.fillStyle = '#fff';
    ctx.lineWidth = outline;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.arc(0, 0, visRadius, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

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

  draw(view) {
    super.draw(view);
    super.drawSelection(view);

    this.drawBody(view);

    super.drawDangerRadii(view);
    if (view.debug) {
      super.drawPhysicsDebugInfo(view);
    }
  }
}
