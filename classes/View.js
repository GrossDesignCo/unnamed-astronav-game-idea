export class View {
  constructor({ canvas, timeScale }) {
    this.canvas = canvas;
    this.scale = 1;
    this.userZoomLevel = 1;
    this.offset = [0, 0];
    this.centerOfMass = [0, 0];
    this.timeScale = timeScale;
    this.selectBoxAddMode = false;
    // this.audioCtx = new window.AudioContext();

    this.resize();
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
    document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    // this.resize(); // doesn't work as expected

    // TODO: handle exiting from fullscreen
  }

  zoom(e) {
    console.log('Zoom!');
    // TODO: Figure out a scroll-based zoom scheme that supports mice and touch
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

    // Highlight the selected objects
    if (this.selectBox) {
      const { x1, y1, x2, y2 } = this.selectBox;
      const x1g = this.toGameXCoords(x1);
      const y1g = this.toGameYCoords(y1);
      const x2g = this.toGameXCoords(x2);
      const y2g = this.toGameYCoords(y2);

      const left = x1 < x2 ? x1g : x2g;
      const right = x2 > x1 ? x2g : x1g;
      const top = y1 < y2 ? y1g : y2g;
      const bottom = y2 > y1 ? y2g : y1g;

      objects.forEach((obj) => {
        const withinXBounds = obj.p[0] > left && obj.p[0] < right;
        const withinYBounds = obj.p[1] > top && obj.p[1] < bottom;

        if (withinXBounds && withinYBounds) {
          obj.select();
        } else {
          if (!this.selectBoxAddMode) obj.deselect();
        }
      });
    }
  }

  toGameXCoords(x) {
    return (x - this.width / 2) / this.scale;
  }

  toGameYCoords(y) {
    return (y - this.height / 2) / this.scale;
  }

  toViewXCoords(x) {
    return this.width / 2 + x * this.scale + this.offset[0];
  }

  toViewYCoords(y) {
    return this.height / 2 + y * this.scale + this.offset[1];
  }

  frequencyFromVector(v) {
    // TODO: Figure out a nice-sounding range of frequencies
    return v;
  }

  setSelectBox(x1, y1, x2, y2) {
    this.selectBox = { x1, y1, x2, y2 };
  }

  clearSelectBox() {
    this.selectBox = undefined;
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
    //     console.log(obj);
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
