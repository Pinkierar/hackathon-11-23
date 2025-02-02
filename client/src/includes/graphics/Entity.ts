import { Vector } from 'p5';
import { Drawable, Shape, Style, VoidShape } from '#includes/graphics';

export class Entity<S extends Shape = VoidShape> extends Drawable {
  protected shape: S;

  protected readonly position: Vector;
  protected style: Style;
  private readonly defaultStyle: Readonly<Style>;

  public constructor(shape: S, style?: Style) {
    super();

    this.style = style ?? {};
    this.defaultStyle = { ...this.style };

    this.position = new Vector();
    this.shape = shape;
  }

  public setStyle(style: Style): void {
    this.style = {
      stroke: style.stroke ?? this.defaultStyle.stroke,
      strokeWidth: style.strokeWidth ?? this.defaultStyle.strokeWidth,
      fill: style.fill ?? this.defaultStyle.fill,
    };
  }

  public getStyle(): Readonly<Style> {
    return this.style;
  }

  public setPosition(position: Vector): void;
  public setPosition(x: number, y: number): void;
  public setPosition(arg1: Vector | number, y?: number): void;
  public setPosition(arg1: Vector | number, y?: number): void {
    if (arg1 instanceof Vector) return void this.position.set(arg1);
    if (y !== undefined) return void this.position.set(arg1, y);
  }

  public getPosition(): Vector {
    return this.position;
  }

  public move(offset: Vector): void;
  public move(x: number, y: number): void;
  public move(arg1: Vector | number, y?: number): void;
  public move(arg1: Vector | number, y?: number): void {
    if (arg1 instanceof Vector) return void this.position.add(arg1);
    if (y !== undefined) return void this.position.add(arg1, y);
  }

  public isInside(point: Vector): boolean {
    const local = this.toLocal(point);

    return this.shape.isInside(local);
  }

  public toLocal(point: Vector): Vector {
    return point.copy().sub(this.position);
  }

  public draw(): void {
    const { p, shape, style } = this;

    p.push();

    style.fill ? p.fill(style.fill) : p.noFill();
    style.stroke ? p.stroke(style.stroke) : p.noStroke();
    p.strokeWeight(style.strokeWidth ?? 1);
    p.translate(this.position);

    shape.draw();

    p.pop();
  }
}
