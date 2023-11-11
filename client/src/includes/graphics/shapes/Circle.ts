import {Shape} from './Shape';
import {Vector} from 'p5';
import {BoundingBox} from '#includes/graphics';

export class Circle extends Shape {
  private radius: number;

  public constructor(radius: number) {
    super();

    this.radius = radius;
  }

  public getRadius(): number {
    return this.radius;
  }

  public setRadius(radius: number): void {
    this.radius = radius;
  }

  public isInside(point: Vector): boolean {
    return point.mag() <= this.radius;
  }

  public toBoundingBox(): BoundingBox {
    return new BoundingBox(
      new Vector(-this.radius, -this.radius),
      new Vector(this.radius, this.radius),
    );
  }

  public draw(): void {
    const p = this.p;

    p.circle(0, 0, this.radius + this.radius);
  }

  public drawVertices(): void {
    this.draw();
  }
}