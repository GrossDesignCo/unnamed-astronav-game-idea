export const star = (ctx, radius) => {
  // Styles
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff';
  ctx.lineWidth = 6;

  // Draw
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();

  ctx.setLineDash([8, 4]);
  ctx.strokeStyle = '#e24a4a';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.arc(0, 0, radius * 2, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
};
