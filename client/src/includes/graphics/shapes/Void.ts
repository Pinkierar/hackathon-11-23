import { Shape } from './Shape';
import { Vector } from 'p5';

export class VoidShape extends Shape {
  public draw(): void {}

  public drawVertices(): void {}

  public isInside(_point: Vector): boolean {
    return false;
  }
}