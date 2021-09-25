import { Canvas } from '../engine/Canvas';
import { planet } from '../objects/planet';
import { ship } from './ship';
import { star } from './star';

export const renderAllAssets = (canvas) => {
  const space = new Canvas({ canvas });
  const ctx = space.getCtx();

  ctx.translate(100, 100);
  planet(ctx, 30);

  ctx.translate(200, 0);
  planet(ctx, 60);

  ctx.translate(200, 0);
  ship(ctx);

  ctx.translate(200, 0);
  ship(ctx, 2);

  ctx.translate(0, 200);
  star(ctx, 60);
};
