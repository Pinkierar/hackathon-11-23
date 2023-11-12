import { RectangleShape } from './Rectangle';
import { Image, Vector } from 'p5';

export class SpriteShape extends RectangleShape {
  public static readonly images: Map<string, Image> = new Map();

  //

  private scale: number = 1;
  private src: Image;
  private sprite!: Image;
  private view!: Vector4n;

  public constructor(src: Image | undefined, scale: number) {
    if (!src) throw new Error('src is not exist');

    super();

    this.src = src;

    this.setView([0, 0, src.width, src.height]);
    this.setScale(scale);
  }

  public setScale(scale: number): void {
    this.scale = scale;

    this.applyScale();
  }

  public getScale(): number {
    return this.scale;
  }

  public setView(view: Vector4n): void {
    this.view = view;

    this.applyView();
  }

  public override setSize(_size: Vector): void {
    throw new Error('Use setScale');
  }

  public override draw(): void {
    const { p, sprite, size } = this;

    const from = size.copy().div(-2);

    p.image(sprite, from.x, from.y, size.x, size.y);
    super.draw();
  }

  //

  private applyScale(): void {
    const { p, view, scale } = this;

    super.setSize(p.createVector(view[2], view[3]).mult(scale));
  }

  private applyView(): void {
    const { p, src, view } = this;

    this.sprite = p.createImage(view[2], view[3]);
    this.sprite.copy(src, ...view, 0, 0, view[2], view[3]);

    this.applyScale();
  }
}
