import { StellarBody } from './StellarBody';

/**
 * @param {number} thrust WIP
 * @param {string} type null | 'cargo' | ?
 */
export class Ship extends StellarBody {
  constructor(props) {
    super(props);

    const { type = 'unknown', description } = props;

    this.type = type;
    this.description = `${type}${description ? `; ${description}` : ''}`;

    // + is clockwise, -, counter-clockwise? measured in rotations per day
    this.angularThrust = 0;
  }

  update(dt) {
    this.setAngularV(this.angularV - this.angularThrust);
    super.update(dt);

    if (this.name === 'SS Testamundo') {
      console.log(this.name, this.predictedThrust, this.thrust);
    }
  }

  drawBody(view) {
    const { ctx } = view;

    const labelX = 30;

    ctx.rotate((this.angle * Math.PI) / 180);

    // Basic Arrow shape
    if (this.type === 'unknown') {
      ctx.beginPath();
      ctx.moveTo(1, -8);
      ctx.lineTo(8, 8);
      ctx.lineTo(2, 6);
      ctx.lineTo(0, 8);
      ctx.lineTo(-2, 6);
      ctx.lineTo(-8, 8);
      ctx.lineTo(-1, -8);
      ctx.closePath();
    }

    // Boxy-ship shape
    if (this.type === 'cargo') {
      ctx.beginPath();
      // draw rght side
      ctx.moveTo(5, -19);
      ctx.lineTo(7, -16);
      ctx.lineTo(8, -4);
      ctx.lineTo(10, -2);
      ctx.lineTo(10, 10);
      ctx.lineTo(8, 12);
      ctx.lineTo(8, 18);
      ctx.lineTo(6, 22);

      // mirror for the left side
      ctx.lineTo(-6, 22);
      ctx.lineTo(-8, 18);
      ctx.lineTo(-8, 12);
      ctx.lineTo(-10, 10);
      ctx.lineTo(-10, -2);
      ctx.lineTo(-8, -4);
      ctx.lineTo(-7, -16);
      ctx.lineTo(-5, -19);
      ctx.closePath();
    }

    ctx.rotate((-1 * this.angle * Math.PI) / 180);

    ctx.strokeStyle = '#555';
    ctx.fillStyle = '#fff';
    ctx.lineWidth = 1;

    ctx.fill();
    ctx.stroke();

    // Mark an X if dead
    if (this.dead) {
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(-10, -10);
      ctx.moveTo(-10, 10);
      ctx.lineTo(10, -10);
      ctx.closePath();

      ctx.strokeStyle = '#f40028';
      ctx.fillStyle = '#fff';
      ctx.lineWidth = 3;

      ctx.fill();
      ctx.stroke();
    }

    // Label
    if (view.showLabels || this.selected) {
      if (this.name) {
        ctx.fillStyle = '#fff';
        ctx.fillText(this.name, labelX, 4 * window.devicePixelRatio);
      }
      if (this.description) {
        ctx.fillStyle = '#999';
        ctx.fillText(this.description, labelX, 24 * window.devicePixelRatio);
      }
    }
  }

  drawPredictedPath(view) {
    const { ctx } = view;

    ctx.beginPath();
    if (this.selected) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#fff';
    } else {
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#555';
    }

    ctx.moveTo(0, 0);
    let markTime = 0;
    this.predictedPath.forEach((obj, i) => {
      // Get the future point relative to the current object origin
      const px = (obj.p[0] - this.p[0]) * view.scale;
      const py = (obj.p[1] - this.p[1]) * view.scale;

      // Drawing 10k+ separate paths is super performance heavy, see if canvas can just draw a gradient
      // const transparency = (1 - i / this.predictedPath.length).toFixed(2);
      // const fill = `rgba(200, 200, 200, ${transparency})`;
      // // const fill = "rgba(200, 200, 200, 0.15)"
      // if (i % 1000 === 0) console.log({ fill, transparency, length: this.predictedPath.length, i });
      // ctx.strokeStyle = fill;
      // ctx.fillStyle = fill;
      ctx.lineTo(px, py);

      // Display a timestamp every 4 days
      if (markTime > 4) {
        ctx.fillText(`Day ${obj.t.toFixed(0)}`, px, py);
        markTime = 0;
      } else {
        markTime += obj.dt;
      }
    });

    ctx.stroke();
  }

  drawBurnControl(view) {
    const { ctx } = view;
    // Get Mouse position relative to the ship coordinates
    const [gameShipX, gameShipY] = this.p;
    const [viewMouseX, viewMouseY] = view.getMousePos();
    const [viewShipX, viewShipY] = view.toViewCoords(this.p);
    const relativeMouseX = viewShipX * -1 + viewMouseX * 2;
    const relativeMouseY = viewShipY * -1 + viewMouseY * 2;

    // Feedback into predicted paths
    // TODO: Hunt down the cause of this /2 *2 issue.
    // Clearly something is causing the view units to be halved when translated back into game units.
    // And even when rendered, a 100x100 line from the ship actually renders 50x50
    const [gameMouseX, gameMouseY] = view.toGameCoords([
      viewMouseX * 2,
      viewMouseY * 2,
    ]);
    this.setPredictedThrust(gameMouseX - gameShipX, gameMouseY - gameShipY);

    // line from ship to mouse
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;

    ctx.moveTo(0, 0);
    ctx.lineTo(relativeMouseX, relativeMouseY);
    // ctx.lineTo(100, 100); // acutally renders (50, 50)??!?!
    ctx.closePath();
    ctx.stroke();

    // // Small circle around mouse
    // ctx.beginPath();
    // ctx.strokeStyle = '#fffa';

    // ctx.arc(mouseX, mouseY, 24, 0, Math.PI * 2, true);
    // ctx.closePath();
    // ctx.stroke();

    // const burnRadius = Math.hypot(mouseX, mouseY);

    // // Circle around ship to the mouse
    // ctx.beginPath();
    // ctx.strokeStyle = '#fffa';
    // ctx.fillStyle = '#aaa1';

    // ctx.arc(0, 0, burnRadius, 0, Math.PI * 2, true);
    // ctx.closePath();
    // ctx.stroke();
    // ctx.fill();
  }

  draw(view) {
    super.draw(view);
    super.drawSelection(view);
    if (view.debug) {
      super.drawPhysicsDebugInfo(view);
    }
    if (view.predictPaths) {
      this.drawPredictedPath(view);
    }

    if (this.selected) {
      this.drawBurnControl(view);
    }
    this.drawBody(view);
  }
}
