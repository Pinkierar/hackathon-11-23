import { Rectangle } from './Rectangle';
import { Vector } from 'p5';
import { Line } from '#includes/graphics';
import { isTruthy } from '#includes/isTruthy.ts';

type WallsConfig = Partial<{
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}>;

export class Walls extends Rectangle {
  private lines: ReadonlyArray<Line> = [];
  private config!: Readonly<WallsConfig>;

  public constructor(size: Vector, config: WallsConfig) {
    super(size);

    this.setConfig(config);
  }

  public setConfig(config: WallsConfig): void {
    const { p, size } = this;

    this.config = config;

    const topLeft = p.createVector(0, 0);
    const bottomRight = p.createVector(size.x, size.y);
    const topRight = p.createVector(size.x, 0);
    const bottomLeft = p.createVector(0, size.y);

    this.lines = [
      // config.left && new Line(topLeft, topRight),
      // config.bottom && new Line(topRight, bottomRight),
      // config.right && new Line(bottomRight, bottomLeft),
      // config.top && new Line(bottomLeft, topLeft),
      config.top && new Line(topLeft, topRight),
      config.right && new Line(topRight, bottomRight),
      config.bottom && new Line(bottomRight, bottomLeft),
      config.left && new Line(bottomLeft, topLeft),
    ].filter(isTruthy);
  }

  public getConfig(): Readonly<WallsConfig> {
    return this.config;
  }

  public override draw(): void {
    const { p } = this;

    p.beginShape(p.LINES);

    this.drawVertices();

    p.endShape();
  }

  public drawVertices(offset?: Vector): void {
    const { lines } = this;

    for (let i = 0; i < lines.length; i++) {
      lines[i].drawVertices(offset);
    }
  }
}
