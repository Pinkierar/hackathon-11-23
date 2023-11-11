import { action, computed, makeObservable, observable } from 'mobx';

const NOTIFICATION_LIFE_TIME = 5000;

export enum NotificationType {
  error,
  info,
}

export type NotificationItem = {
  id: number;
  content: string;
  type: NotificationType;
  displayed: boolean;
};

class Notifications {
  private _lastId: number = 0;
  private _items: NotificationItem[] = [];

  public constructor() {
    makeObservable<typeof this, '_items' | 'remove' | 'add'>(this, {
      _items: observable.deep,
      items: computed,
      addInfo: action.bound,
      addError: action.bound,
      add: action.bound,
      remove: action.bound,
    });
  }

  public get items() {
    return this._items;
  }

  public addInfo(content: NotificationItem['content']): void {
    this.add(NotificationType.info, content);
  }

  public addError(error: NotificationItem['content'] | Error): void {
    if (error instanceof Error)
      return this.add(NotificationType.error, error.message);

    this.add(NotificationType.error, error);
  }

  //

  private add(
    type: NotificationItem['type'],
    content: NotificationItem['content'],
  ): void {
    const notification = this.create(type, content);

    this._items.push(notification);

    setTimeout(() => this.remove(notification.id), NOTIFICATION_LIFE_TIME);
  }

  private create(
    type: NotificationItem['type'],
    content: NotificationItem['content'],
  ): NotificationItem {
    this._lastId++;

    return {
      id: this._lastId,
      type: type,
      content: content,
      displayed: true,
    };
  }

  private remove(id: NotificationItem['id']): void {
    this._items.splice(this.indexById(id), 1);
  }

  private indexById(id: NotificationItem['id']): number {
    return this._items.findIndex((item) => item.id === id);
  }
}

export const notifications = new Notifications();
