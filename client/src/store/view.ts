import { action, computed, makeObservable, observable } from 'mobx';

class View {
  private _grabbing: boolean = false;

  public constructor() {
    makeObservable<View, '_grabbing'>(this, {
      _grabbing: observable.ref,
      grabbing: computed,
      setGrabbing: action.bound,
    });
  }

  public get grabbing(): boolean {
    return this._grabbing;
  }

  public setGrabbing(config: boolean = false) {
    this._grabbing = config;
  }
}

export const view = new View();
