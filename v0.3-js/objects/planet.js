export class Planet {
  constructor({ pos, mass, radius }) {
    this.pos = pos;
    this.mass = mass;
    this.radius = radius;
  }

  draw(ctx) {
    // Styles
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff2';
    ctx.lineWidth = this.radius / 5;

    // Draw
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  }
}

export const planet = (ctx, radius) => {
  // Styles
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff2';
  ctx.lineWidth = radius / 5;

  // Draw
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};
