import { Vector } from 'p5';
import { Shape } from './Shape';
import { BoundingBox } from '#includes/graphics';

export class RoomShape extends Shape {
  private readonly walls: Matrix4x4n = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  private config!: Vector4b;
  private readonly size: Vector = new Vector();

  public constructor(size: Vector, config: Vector4b) {
    super();

    this.setSize(size);
    this.setConfig(config);
  }

  public setSize(size: Vector): void {
    this.size.set(size);

    this.applySize();
  }

  public getSize(): Vector {
    return this.size;
  }

  public setConfig(config: Vector4b): void {
    this.config = config;
  }

  public getConfig(): Vector4b {
    return this.config;
  }

  public override draw(): void {
    const { p } = this;

    p.beginShape(p.LINES);

    this.drawVertices();

    p.endShape();
  }

  public drawVertices(): void {
    const { p, walls, config } = this;

    for (let i = 0; i < 4; i++) {
      if (!config[i]) continue;

      p.vertex(walls[i][0], walls[i][1]);
      p.vertex(walls[i][2], walls[i][3]);
    }
  }

  public isInside(point: Vector): boolean {
    const { p, size } = this;

    const boundingBox = new BoundingBox(p.createVector(), size);

    return boundingBox.isInside(point);
  }

  //

  private applySize(): void {
    const { size, walls } = this;

    walls[0][2] = walls[1][0] = walls[1][2] = walls[2][0] = size.x;
    walls[1][3] = walls[2][1] = walls[2][3] = walls[3][1] = size.y;
  }
}
