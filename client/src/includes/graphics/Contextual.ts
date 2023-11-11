export abstract class Contextual {
  private static _p?: P5Type;

  public static init(p: P5Type): void {
    this.clear();
    Contextual._p = p;
  }

  public static clear(): void {
    delete Contextual._p;
  }

  //

  protected constructor() {
    if (!Contextual._p) throw new Error('Run Contextual.init to initialize');
  }

  protected get p(): P5Type {
    if (!Contextual._p) throw new Error('Run Contextual.init to initialize');

    return Contextual._p;
  }
}