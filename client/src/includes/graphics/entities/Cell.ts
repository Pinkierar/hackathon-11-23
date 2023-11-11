import {CellConfig, CellShape, Figure, Style} from '#includes/graphics';
import {Vector} from 'p5';

export class Cell extends Figure {
  public constructor(size: Vector, config: CellConfig, style?: Style) {
    super(new CellShape(size, config), style);
  }
}