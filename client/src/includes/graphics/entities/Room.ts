import { Figure, RoomShape, Style } from '#includes/graphics';
import { Vector } from 'p5';

export class Room extends Figure<RoomShape> {
  public setSize;
  public getSize;

  public constructor(size: Vector, config: Vector4b, style?: Style) {
    super(new RoomShape(size, config), style);

    this.setSize = this.shape.setSize.bind(this.shape);
    this.getSize = this.shape.getSize.bind(this.shape);
  }
}
