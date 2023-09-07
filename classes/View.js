// higher dt = lower accuracy
const defaultDT = 0.1;
const dtMultiplier = 2;
const maxDT = defaultDT * (dtMultiplier * 4);
const minDT = defaultDT / (dtMultiplier * 4);

const defaultDist = 200;
const distMultiplier = 2;
const maxDist = defaultDist * (distMultiplier * 8);
const minDist = defaultDist / (distMultiplier * 4);

export class View {
  constructor({
    canvas,
    timeScale,
    isPaused = false,
    debug = false,
    defaultZoomLevel = 1,
  }) {
    this.canvas = canvas;
    this.scale = 1;
    this.userZoomLevel = defaultZoomLevel;
    this.offset = [0, 0];
    this.centerOfMass = [0, 0];
    this.timeScale = timeScale;
    this.selectBoxAddMode = false;
    this.showLabels = false;
    this.predictPaths = true;
    this.debug = debug;
    this.isPaused = isPaused;
    this.pathDT = defaultDT; // length of time for eah step (dt)
    this.pathDistance = defaultDist; // Number of days to plot courses for
    // this.audioCtx = new window.AudioContext();
    this.selectedPoint = null;
    this.mousePos = [0, 0];

    this.resize();
  }

  togglePlayPause() {
    this.isPaused = !this.isPaused;

    if (this.isPaused) {
      this.predictPaths = true;
    }
  }

  togglePathPrediction() {
    this.predictPaths = !this.predictPaths;
  }

  setMousePos(x, y) {
    this.mousePos = [x, y];
  }

  getMousePos() {
    return this.mousePos;
  }

  decreasePathDT() {
    if (this.pathDT > minDT) {
      this.pathDT = this.pathDT / dtMultiplier;
      this.increasePathDistance();
    }
    console.info('decrease dt', {
      dist: this.pathDistance,
      dt: this.pathDT,
      minDT,
    });
  }

  increasePathDT() {
    if (this.pathDT < maxDT) {
      this.pathDT = this.pathDT * dtMultiplier;
      this.decreasePathDistance();
    }
    console.info('increase dt', {
      dist: this.pathDistance,
      dt: this.pathDT,
      maxDT,
    });
  }

  increasePathDistance() {
    if (this.pathDistance < maxDist) {
      this.pathDistance = this.pathDistance * distMultiplier;
    }
    console.info({ dist: this.pathDistance, dt: this.pathDT, maxDist });
  }

  decreasePathDistance() {
    if (this.pathDistance > minDist) {
      this.pathDistance = this.pathDistance / distMultiplier;
    }
    console.info({ dist: this.pathDistance, dt: this.pathDT, minDist });
  }

  resize() {
    if (this.canvas && this.ctx) {
      this.canvas.width = window.innerWidth * window.devicePixelRatio;
      this.canvas.height = window.innerHeight * window.devicePixelRatio;

      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      this.ctx.font = `${12 * window.devicePixelRatio}px Menlo, monospace`;
    }
  }

  // Doesn't work in Safari currently.
  fullscreen() {
    try {
      const doc = document.body;
      document.body.requestFullscreen({ navigationUI: 'hide' });
    } catch (error) {
      console.warn('Error going to fullscreen', error);
    }
  }

  zoomIn() {
    this.userZoomLevel = this.userZoomLevel * 2;
  }

  zoomOut() {
    this.userZoomLevel = this.userZoomLevel * 0.5;
  }

  update(objects) {
    // Figure out the focal points
    let focalPoints = objects.filter((obj) => obj.isFocalPoint);
    if (focalPoints.length === 0) {
      focalPoints = objects;
    }

    // Find the center of mass of all the focal points
    let massSum = 0;
    let massPosSum = [0, 0];

    focalPoints.forEach((source) => {
      massPosSum[0] += source.mass * source.p[0];
      massPosSum[1] += source.mass * source.p[1];
      massSum += source.mass;
    });

    // Center of mass equation:
    // SUM position * mass (of each object) / SUM mass (of each object)
    let centerOfMass = [massPosSum[0] / massSum, massPosSum[1] / massSum];

    // If one focal point, set an arbitrary scale around it for the view

    // TODO: if one focal point, get it's distance from the center of mass of the whole system
    let maxDist = 0;
    if (focalPoints.length === 1) {
      maxDist = focalPoints[0].radius * 5; // Arbitrary zoom level for single focus
    }
    // Otherwise, use the center of mass of the focal points
    // and use the distance of the object furthest away
    else {
      focalPoints.forEach((target) => {
        let dist = 0;
        const dx = target.p[0] - centerOfMass[0];
        const dy = target.p[1] - centerOfMass[1];
        dist = Math.hypot(dx, dy);

        if (dist > maxDist) {
          maxDist = dist;
        }
      });
    }

    // Scale the view
    const smallerAxis = this.height < this.width ? this.height : this.width;
    this.scale = (smallerAxis / 2 / maxDist / 1.25) * this.userZoomLevel;

    // Offset the camera to put the center of mass in the center of the view
    this.offset = [
      centerOfMass[0] * this.scale * -1,
      centerOfMass[1] * this.scale * -1,
    ];

    // Click to select a single object
    if (this.selectedPoint) {
      const [x, y] = this.selectedPoint;
      const buffer = 10;

      this.selectBox = {
        x1: x - buffer,
        x2: x + buffer,
        y1: y - buffer,
        y2: y + buffer,
      };
    }

    // Drag to select multiple objects
    if (this.selectBox) {
      const { x1, y1, x2, y2 } = this.selectBox;

      const left = x1 < x2 ? x1 : x2;
      const right = x2 > x1 ? x2 : x1;
      const top = y1 < y2 ? y1 : y2;
      const bottom = y2 > y1 ? y2 : y1;

      objects.forEach((obj) => {
        const objX = this.toViewXCoords(obj.p[0]) / 2;
        const objY = this.toViewYCoords(obj.p[1]) / 2;
        const withinXBounds = objX > left && objX < right;
        const withinYBounds = objY > top && objY < bottom;

        if (withinXBounds && withinYBounds) {
          obj.select();
        } else if (!this.selectBoxAddMode) {
          obj.deselect();
        }

        // Commit thrust maneuvers
        if (obj.commitThrust) {
          obj.commitThrust();
        }
      });
    }

    if (this.selectedPoint) {
      this.selectBox = null;
      this.selectedPoint = null;
    }
  }

  selectPointOnNextUpdate(x, y) {
    this.selectedPoint = [x, y];
  }

  toGameXCoords(x) {
    return (x - this.width / 2) / this.scale;
  }

  toGameYCoords(y) {
    return (y - this.height / 2) / this.scale;
  }

  toGameCoords([x, y]) {
    return [this.toGameXCoords(x), this.toGameYCoords(y)];
  }

  toViewXCoords(x) {
    return x * this.scale + this.offset[0] + this.width / 2;
  }

  toViewYCoords(y) {
    return y * this.scale + this.offset[1] + this.height / 2;
  }

  toViewCoords([x, y]) {
    return [this.toViewXCoords(x), this.toViewYCoords(y)];
  }

  frequencyFromVector(v) {
    // TODO: Figure out a nice-sounding range of frequencies
    return v;
  }

  setSelectBox(x1, y1, x2, y2) {
    this.selectBox = { x1, y1, x2, y2 };
  }

  clearSelectBox() {
    this.selectBox = null;
  }

  setSelectBoxAddMode(bool) {
    this.selectBoxAddMode = bool;
  }

  deselectAll(objects) {
    objects.forEach((obj) => {
      obj.deselect();
      // TODO: Deselecting all should undo any predicted path changes
    });
  }

  toggleLabels() {
    this.showLabels = !this.showLabels;
  }

  drawSelectBox() {
    if (this.selectBox) {
      const ctx = this.ctx;

      const { x1, y1, x2, y2 } = this.selectBox;
      const width = x2 - x1;
      const height = y2 - y1;

      ctx.strokeStyle = '#fff2';
      ctx.fillStyle = '#fff1';
      ctx.beginPath();
      ctx.rect(x1, y1, width, height);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }

  // Draw scale of 1km, 10km, 100km, 1000km, 1m km, 10m km
  drawScale() {
    const ctx = this.ctx;

    ctx.strokeStyle = '#fff2';
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.rect(10, this.height - 10, this.width - 20, 1);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }

  render(objects, space, stats) {
    // TODO: Auditory representation
    // objects.forEach((obj, i) => {
    //   if (!obj.sound) {
    //     obj.sound = new OscillatorNode(this.audioCtx, {
    //       type: 'sine',
    //       frequency: this.frequencyFromVector(obj.totalA),
    //     });
    //     obj.sound.connect(this.audioCtx.destination);
    //     // obj.sound.start();
    //   } else {
    //     // TODO: Smoothly transition between frequencies
    //     obj.sound.frequency.setValueAtTime(
    //       this.frequencyFromVector(obj.totalA),
    //       this.audioCtx.currentTime
    //     );
    //   }
    // });

    // Re-draw Visuals
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.save();

    this.drawSelectBox();

    const x = this.offset[0] * -1;
    const y = this.offset[1] * -1;
    ctx.translate(x, y);

    objects.forEach((obj) => {
      obj.draw(this);
    });

    if (stats) {
      stats.draw(this, space);
    }

    ctx.restore();
  }

  get ctx() {
    return this.canvas.getContext('2d');
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }
}
