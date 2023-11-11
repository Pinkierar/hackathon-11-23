import {Contextual} from '#includes/graphics';

export abstract class Drawable extends Contextual {
  // private static readonly drawables: Drawable[] = [];
  //
  // public static update() {
  //   Drawable.drawables.forEach(drawable => drawable.update())
  // }
  //
  // public static draw() {
  //   Drawable.drawables.forEach(drawable => drawable.draw())
  // }
  //
  // //
  //
  // protected constructor() {
  //   Drawable.drawables.push(this);
  // }

  public abstract draw(): void;
}