export class Keyboard {
  public static isKeyPressed(key: string): boolean {
    return Keyboard.pressedKeys.has(key);
  }

  public static startLinting(): void {
    window.addEventListener('keydown', Keyboard.keydownHandler);
    window.addEventListener('keyup', Keyboard.keyupHandler);
  }

  public static stopLinting(): void {
    window.removeEventListener('keydown', Keyboard.keydownHandler);
    window.removeEventListener('keyup', Keyboard.keyupHandler);
  }

  //

  private static readonly pressedKeys: Set<string> = new Set();

  private static keydownHandler({ code }: KeyboardEvent): void {
    if (Keyboard.pressedKeys.has(code)) return;

    console.log(code);
    Keyboard.pressedKeys.add(code);
  }

  private static keyupHandler({ code }: KeyboardEvent): void {
    Keyboard.pressedKeys.delete(code);
  }
}
