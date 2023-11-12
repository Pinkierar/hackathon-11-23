export class Keyboard {
  public static isKeyPressed(key: string): boolean {
    return Keyboard.pressedKeys.has(key);
  }

  public static startLinting(): void {
    window.addEventListener('keydown', Keyboard.keydownHandler);
    window.addEventListener('keyup', Keyboard.keyupHandler);
    window.addEventListener('blur', Keyboard.blurHandler);
  }

  public static stopLinting(): void {
    window.removeEventListener('keydown', Keyboard.keydownHandler);
    window.removeEventListener('keyup', Keyboard.keyupHandler);
    window.removeEventListener('blur', Keyboard.blurHandler);
  }

  //

  private static readonly pressedKeys: Set<string> = new Set();

  private static keydownHandler({ code }: KeyboardEvent): void {
    if (Keyboard.pressedKeys.has(code)) return;

    Keyboard.pressedKeys.add(code);
  }

  private static keyupHandler({ code }: KeyboardEvent): void {
    Keyboard.pressedKeys.delete(code);
  }

  private static blurHandler(): void {
    Keyboard.pressedKeys.clear();
  }
}
