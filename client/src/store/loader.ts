import {action, computed, makeObservable, observable} from 'mobx';

class Loader {
  private _loaders: Set<string> = new Set(['main-loading']);
  private _isVisible: boolean = true;

  public constructor() {
    makeObservable<typeof this, '_isVisible'>(this, {
      _isVisible: observable.ref,
      isVisible: computed,
      add: action.bound,
      remove: action.bound,
    });
  }

  public get isVisible(): boolean {
    return this._isVisible;
  }

  public add(name: string): void {
    this._loaders.add(name);
    this.update();
  }

  public remove(name: string): void {
    this._loaders.delete(name);
    this.update();
  }

  //

  private update(): void {
    this._isVisible = this._loaders.size > 0;
  }
}

export const loader = new Loader();