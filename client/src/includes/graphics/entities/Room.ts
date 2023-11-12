import { Entity, RoomShape, Style } from '#includes/graphics';
import { Vector } from 'p5';

export class Room extends Entity<RoomShape> {
  public setSize;
  public getSize;
  public setConfig;
  public getConfig;

  public constructor(size: Vector, config: Vector4b, style?: Style) {
    super(new RoomShape(size, config), style);

    this.setSize = this.shape.setSize.bind(this.shape);
    this.getSize = this.shape.getSize.bind(this.shape);
    this.setConfig = this.shape.setConfig.bind(this.shape);
    this.getConfig = this.shape.getConfig.bind(this.shape);
  }
}
