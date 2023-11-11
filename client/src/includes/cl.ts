import {isTruthy} from '#includes/isTruthy.ts';

export const cl = (...classNames: (string | Falsy)[]) => {
  return classNames.filter(isTruthy).join(' ');
};