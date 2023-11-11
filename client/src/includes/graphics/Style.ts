import {Color} from 'p5';

export type Style = {
  stroke?: Color,
  strokeWidth?: number,
  fill?: Color,
};

export class StyleController implements Style {
  private fill?: Color;
  private stroke?: Color;
  private strokeWidth: number = 1;

  public constructor()
  public constructor(style: Style)
  public constructor(fill: Color, stroke?: Color, strokeWidth?: number)
  public constructor(arg1?: Color | Style, stroke?: Color, strokeWidth?: number)
  public constructor(arg1?: Color | Style, stroke?: Color, strokeWidth?: number) {
    if (arg1) {
      if (arg1 instanceof Color) {
        this.fill = arg1;

        if (stroke) {
          this.stroke = stroke;
        }

        if (strokeWidth !== undefined) {
          this.strokeWidth = strokeWidth;
        }
      } else {
        this.fill = arg1.fill;
        this.stroke = arg1.stroke;
        this.strokeWidth = arg1.strokeWidth;
      }
    }
  }
}