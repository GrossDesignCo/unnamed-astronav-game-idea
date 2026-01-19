import { StellarBody } from './StellarBody';

const baseColors = [
  // blue
  '#009cff',
  // green
  '#00ff8c',
  // orange
  '#ff9639',
  // yellow
  '#ffda8a',
];

const generateStyle = (radius) => {
  const polarIceRadius = Math.floor(Math.random() * radius);

  const polarEdgePoints = [];
  let angle = 0;
  let i = 0;
  while (angle < 360) {
    // Pick a point around the edge offset from the radius a little
    // Each point needs an angle, and a +/- distance from the radius
    angle = angle + Math.random() * 0.5 * 2 * Math.PI;
    // +/- between half and a quarter the polarIceRadius
    const dist = Math.min(
      polarIceRadius + (polarIceRadius / 2) * (Math.random() - 0.5),
      radius * 0.9,
    );
    const x = dist * Math.cos(angle);
    const y = dist * Math.sin(angle);
    polarEdgePoints[i] = { angle, dist, x, y };
    i++;
  }
  console.log({ radius, polarIceRadius, polarEdgePoints });

  return {
    baseColor: baseColors.random(),
    polarIceRadius,
    polarEdgePoints,
  };
};

export class Planet extends StellarBody {
  constructor(props) {
    super(props);

    const { radius = 1, rings = [], protoypeStyle, style } = props;

    this.radius = radius;
    this.rings = rings;
    this.protoypeStyle = protoypeStyle;

    // Randomly generate a planet if no style provided :)
    this.style = style ?? generateStyle(radius);
  }

  drawBody(view) {
    const { ctx } = view;
    const visRadius = this.radius * view.scale;
    const outline = 1.2 + visRadius / 8;
    // Offset the radius by half the outline width since to get accurate surface positions
    const adjustedRadius = Math.max(visRadius - outline / 2, 0.5);
    const labelX = visRadius + outline + 4;

    // Circle for planet body
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff2';
    ctx.lineWidth = outline;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.arc(0, 0, adjustedRadius, 0, Math.PI * 2, true);
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

    // Label
    if (view.showLabels || this.selected) {
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

  drawBodyPrototype(view) {
    const { ctx } = view;
    const radius = Math.floor(this.radius * view.scale);
    const poleRadius = Math.floor(this.style.polarIceRadius * view.scale);
    // Always draw at least _something_, even if it's a tiny star-like dot
    const edgeRadius = Math.max(radius, 0.5);

    // Circle for planet body
    ctx.fillStyle = this.style.baseColor;

    ctx.beginPath();
    ctx.arc(0, 0, edgeRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    // Edge Highlight
    ctx.strokeStyle = `rgba(255,255,255,0.75)`;
    ctx.lineWidth = radius * 0.025;

    ctx.beginPath();
    ctx.arc(0, 0, edgeRadius - ctx.lineWidth / 2, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.stroke();

    // Jagged region for polar ice cap
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.fillStyle = '#fefefe';

    ctx.beginPath();
    ctx.arc(0, 0, this.style.polarIceRadius * view.scale, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(
      this.style.polarEdgePoints[0].x,
      this.style.polarEdgePoints[0].y,
    );
    this.style.polarEdgePoints.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();

    ctx.fill();
  }

  drawRings(view) {
    const { ctx } = view;
    // Rings
    this.rings.forEach((ring) => {
      const width = (ring[1] - ring[0]) * view.scale;
      const radius = ring[0] * view.scale;

      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = (ring[1] - ring[0]) * view.scale;

      ctx.beginPath();
      ctx.arc(0, 0, radius + width / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.stroke();
    });
  }

  drawLabel(view) {
    const { ctx } = view;
    const visRadius = this.radius * view.scale;
    const labelX = visRadius * 1.25;

    // Label
    if (view.showLabels || this.selected) {
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
    if (this.selected) {
      ctx.strokeStyle = '#fff9';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#fff9';
    } else {
      ctx.strokeStyle = '#5557';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#5557';
    }

    ctx.moveTo(0, 0);
    let markTime = 0;
    this.predictedPath.forEach((obj, i) => {
      // Get the future point relative to the current object origin
      const px = (obj.p[0] - this.p[0]) * view.scale;
      const py = (obj.p[1] - this.p[1]) * view.scale;

      // Drawing 10k+ separate paths is super performance heavy, see if canvas can just draw a gradient
      // const transparency = (1 - i / this.predictedPath.length).toFixed(2);
      // const fill = `rgba(200, 200, 200, ${transparency})`;
      // // const fill = "rgba(200, 200, 200, 0.15)"
      // if (i % 1000 === 0) console.log({ fill, transparency, length: this.predictedPath.length, i });
      // ctx.strokeStyle = fill;
      // ctx.fillStyle = fill;
      ctx.lineTo(px, py);

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
    if (this.protoypeStyle) {
      this.drawBodyPrototype(view);
      this.drawRings(view);
      this.drawLabel(view);
    } else {
      this.drawBody(view);
    }

    super.drawDangerRadii(view);
    if (view.debug) {
      super.drawPhysicsDebugInfo(view);
    }
  }
}
