import { RectangleShape } from './Rectangle';
import { Image } from 'p5';

export class SpriteShape extends RectangleShape {
  private image: Image;

  public constructor(scale: number, path: string) {
    super();

    this.image = this.p.loadImage(path);

    const imageSize = this.p.createVector(this.image.width, this.image.height);
    this.setSize(imageSize.mult(scale));
  }

  public override draw(): void {
    const { p, image, size } = this;

    const from = size.copy().div(-2);

    p.image(image, from.x, from.y, size.x, size.y);
  }
}
