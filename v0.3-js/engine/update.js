export const update = (dt, space, objects) => {
  objects.forEach((obj) => {
    if (obj.setAccel) {
      obj.setAccel(dt, objects);
    }

    obj.update(dt, space);

    if (obj.predictPath) {
      obj.predictPath(dt, objects);
    }
  });

  space.update(objects);
};
