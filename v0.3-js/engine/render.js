export const render = (space, objects) => {
  const ctx = space.ctx;

  ctx.clearRect(0, 0, space.width, space.height);
  ctx.save();

  objects.forEach((object) => {
    object.draw(space);
  });

  ctx.restore();
};
