import { Vector } from 'p5';
import { LineShape, RectangleShape } from '#includes/graphics';
import { isTruthy } from '#includes/isTruthy';

export type CellConfig = Partial<{
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}>;

export class CellShape extends RectangleShape {
  private lines: ReadonlyArray<LineShape> = [];
  private config!: Readonly<CellConfig>;

  public constructor(size: Vector, config: CellConfig) {
    super(size);

    this.setConfig(config);
  }

  public setConfig(config: CellConfig): void {
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
      config.top && new LineShape(topLeft, topRight),
      config.right && new LineShape(topRight, bottomRight),
      config.bottom && new LineShape(bottomRight, bottomLeft),
      config.left && new LineShape(bottomLeft, topLeft),
    ].filter(isTruthy);
  }

  public getConfig(): Readonly<CellConfig> {
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
