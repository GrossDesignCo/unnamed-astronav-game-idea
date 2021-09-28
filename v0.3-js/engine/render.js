export const render = (space, objects) => {
  const ctx = space.getCtx();

  ctx.clearRect(0, 0, space.getWidth(), space.getHeight());
  ctx.save();

  objects.forEach((object) => {
    object.draw(space);
  });

  ctx.restore();
};
