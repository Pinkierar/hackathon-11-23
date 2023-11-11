import { HTMLAttributes } from 'react';
import { observer } from 'mobx-react-lite';
import { notifications, NotificationType } from '#store';
import { checkNever } from '#global';

type NotificationsPropsMin = {
  children?: never;
};

type NotificationsProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof NotificationsPropsMin
> &
  NotificationsPropsMin;

export const Notifications = observer<NotificationsProps>((props) => {
  const { children, ...otherProps } = props;

  return (
    <div {...otherProps}>
      {notifications.items
        .filter((item) => item.displayed)
        .map((item) =>
          item.type === NotificationType.info ? (
            <div key={item.id}>{item.content}</div>
          ) : item.type === NotificationType.error ? (
            <div key={item.id}>Error: {item.content}</div>
          ) : (
            checkNever(item.type)
          ),
        )}
    </div>
  );
});
