import { Entity, SpriteShape, Style } from '#includes/graphics';
import { Image } from 'p5';

export class Parent extends Entity<SpriteShape> {
  public setView;
  public setScale;

  public constructor(src: Image | undefined, scale: number, style?: Style) {
    const sprite = new SpriteShape(src, scale);
    super(sprite, style);

    this.setView = this.shape.setView.bind(this.shape);
    this.setScale = this.shape.setScale.bind(this.shape);
  }
}
