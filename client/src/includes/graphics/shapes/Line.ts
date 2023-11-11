import { Vector } from 'p5';
import { Shape } from './Shape';
import { BoundingBox } from '#includes/graphics';

export class Line extends Shape {
  protected readonly from: Vector = new Vector();
  protected readonly to: Vector = new Vector();

  public constructor(from: Vector, to: Vector) {
    super();

    this.setFrom(from);
    this.setTo(to);
  }

  public setFrom(position: Vector): void {
    this.from.set(position);
  }

  public getFrom(): Vector {
    return this.from;
  }

  public setTo(position: Vector): void {
    this.to.set(position);
  }

  public getTo(): Vector {
    return this.to;
  }

  public isInside(_point: Vector): boolean {
    return false;
  }

  public draw(): void {
    const { p } = this;

    p.beginShape(p.LINES);
    this.drawVertices();
    p.endShape();
  }

  public drawVertices(offset?: Vector): void {
    const { p } = this;

    offset = offset ?? p.createVector();
    const from = this.from.copy().add(offset);
    const to = this.to.copy().add(offset);

    p.vertex(from.x, from.y);
    p.vertex(to.x, to.y);
  }

  public toBoundingBox(): BoundingBox {
    const { from, to } = this;

    return new BoundingBox(
      new Vector(Math.min(from.x, to.x), Math.min(from.y, to.y)),
      new Vector(Math.max(from.x, to.x), Math.max(from.y, to.y)),
    );
  }
}
