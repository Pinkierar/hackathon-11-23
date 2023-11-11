import {Vector} from 'p5';
import {Shape} from './Shape';
import {BoundingBox} from '#includes/graphics';

export class Polygon extends Shape {
  protected vertices: Vector[];

  public constructor(vertices: Vector[]) {
    super();

    this.vertices = [];

    this.setVertices(vertices);
  }

  public setVertices(vertices: Vector[]): void {
    if (vertices.length < 3)
      throw new Error('The polygon must contain at least three vertices');

    this.vertices = vertices;
  }

  public getVertex(index: number): Vector | undefined {
    return this.vertices[index];
  }

  public getVertices(): Vector[] {
    return this.vertices;
  }

  public toBoundingBox(): BoundingBox {
    const vertices = this.vertices;

    const firstVertex = vertices[0];
    const from = firstVertex.copy();
    const to = firstVertex.copy();

    for (let i = 1; i < vertices.length; i++) {
      const vertex = vertices[i];

      from.x = Math.min(from.x, vertex.x);
      from.y = Math.min(from.y, vertex.y);

      to.x = Math.max(to.x, vertex.x);
      to.y = Math.max(to.y, vertex.y);
    }

    return new BoundingBox(from, to);
  }

  public isInside(point: Vector): boolean {
    if (!this.toBoundingBox().isInside(point)) return false;

    const vertices = this.vertices;

    let isInside = false;

    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      const {x: xi, y: yi} = vertices[i];
      const {x: xj, y: yj} = vertices[j];

      const intersect =
        ((yi > point.y) !== (yj > point.y)) &&
        (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);

      if (intersect) {
        isInside = !isInside;
      }
    }

    return isInside;
  }

  public draw(): void {
    const {p, vertices} = this;

    p.beginShape(p.TESS);

    vertices.forEach(({x, y}) => p.vertex(x, y));

    p.endShape(p.CLOSE);
  }
}