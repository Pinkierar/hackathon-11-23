import { Entity, Shape, SpriteShape, Style } from '#includes/graphics';
import { Image, Vector } from 'p5';

export class Person<S extends Shape> extends Entity<SpriteShape> {
  public setView;
  public setScale;
  private hitbox: Entity<S>;

  public constructor(
    src: Image | undefined,
    scale: number,
    hitbox: Entity<S>,
    style?: Style,
  ) {
    const sprite = new SpriteShape(src, scale);
    super(sprite, style);

    this.setView = this.shape.setView.bind(this.shape);
    this.setScale = this.shape.setScale.bind(this.shape);

    this.hitbox = hitbox;
  }

  public override isInside(point: Vector): boolean {
    return this.hitbox.isInside(point );
  }
}
