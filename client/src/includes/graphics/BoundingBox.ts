import {Vector} from 'p5';

export class BoundingBox {
  public readonly topLeft: Vector = new Vector();
  public readonly bottomRight: Vector = new Vector();

  public constructor(topLeft: Vector, bottomRight: Vector) {
    this.topLeft.set(topLeft);
    this.bottomRight.set(bottomRight);
  }

  public isInside(point: Vector): boolean {
    const {topLeft, bottomRight} = this;

    const insideOfX = point.x >= topLeft.x && point.x <= bottomRight.x;
    const insideOfY = point.y >= topLeft.y && point.y <= bottomRight.y;

    return insideOfX && insideOfY;
  }
}