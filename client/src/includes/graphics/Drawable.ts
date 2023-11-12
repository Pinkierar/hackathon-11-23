import {Contextual} from '#includes/graphics';

export abstract class Drawable extends Contextual {
  public abstract draw(): void;
}