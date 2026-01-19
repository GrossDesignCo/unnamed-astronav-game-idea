/**
 * Array.random()
 * - This is a horrible hacky practice, polluting the Array prototype,
 * but it's also the simplest, cleanest solution available & I
 * genuinely like the syntax [].random() better than random([]),
 * and it's my project, so sue me.
 *
 * @returns a random item from the array
 */
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
