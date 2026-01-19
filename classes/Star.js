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
    // Offset the radius by half the outline width since to get accurate surface positions
    const adjustedRadius = Math.max(visRadius - outline / 2, 0.5);
    const labelX = visRadius + outline + 4;

    // Ambient Glow
    const gradient = ctx.createRadialGradient(
      0,
      0,
      adjustedRadius,
      0,
      0,
      adjustedRadius * 100,
    );

    // Add three color stops
    gradient.addColorStop(0, 'rgba(255,255,255,0.25)');
    gradient.addColorStop(0.1, 'rgba(255,255,255,0.125)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.075)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(
      adjustedRadius * -100,
      adjustedRadius * -100,
      adjustedRadius * 200,
      adjustedRadius * 200,
    );

    // Circle for Star's physical body
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    ctx.lineWidth = outline;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.arc(0, 0, adjustedRadius, 0, Math.PI * 2, true);
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
