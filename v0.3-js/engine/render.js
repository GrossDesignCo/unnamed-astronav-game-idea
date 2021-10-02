export const render = (view, space) => {
  const ctx = view.ctx;

  ctx.clearRect(0, 0, view.width, view.height);
  ctx.save();

  space.objects.forEach((obj) => {
    obj.draw(view);
  });

  ctx.restore();
};
