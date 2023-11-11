import type { Vector } from 'p5';
import { Drawable } from '#includes/graphics';

export abstract class Shape extends Drawable {
  public abstract isInside(point: Vector): boolean;
}