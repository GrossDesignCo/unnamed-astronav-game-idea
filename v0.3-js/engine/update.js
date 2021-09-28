export const update = (dt, space, objects) => {
  objects.forEach((obj) => {
    if (obj.computeAccel) {
      obj.computeAccel(dt, objects);
    }

    obj.update(dt, space);
  });

  space.update(objects);
};
