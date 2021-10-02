export const ship = (ctx, thrust) => {
  // Ship
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff2';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 2;

  // Draw
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(10, 8);
  ctx.lineTo(0, -20);
  ctx.lineTo(-10, 8);
  ctx.lineTo(0, 0);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();

  if (thrust > 1) {
    // TODO: render thrusty circles :)
    ctx.beginPath();
    ctx.arc(0, 13, 4, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 24, 2, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  }
};
