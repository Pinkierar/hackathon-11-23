import {Vector} from 'p5';
import {Shape} from './Shape';
import {BoundingBox} from '#includes/graphics';

export class Rectangle extends Shape {
  protected readonly size: Vector;

  public constructor(size: Vector) {
    super();

    this.size = new Vector();

    this.setSize(size);
  }

  public setSize(size: Vector): void {
    this.size.set(size);
  }

  public getSize(): Vector {
    return this.size;
  }

  public isInside(point: Vector): boolean {
    const to = this.size.copy().div(2);
    const from = to.copy().mult(-1);

    const boundingBox = new BoundingBox(from, to);

    return boundingBox.isInside(point);
  }

  public draw(): void {
    const {p, size} = this;

    const from = size.copy().div(-2);

    p.rect(from.x, from.y, size.x, size.y);
  }

  public drawVertices(): void {
    this.draw();
  }
}