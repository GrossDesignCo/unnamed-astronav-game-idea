export class Canvas {
  constructor(props) {
    this.canvas = props.canvas;
    this.ctx = props.canvas.current.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.current.width = this.width;
    this.canvas.current.height = this.height;
  }

  getCtx() {
    return this.ctx;
  }
}
