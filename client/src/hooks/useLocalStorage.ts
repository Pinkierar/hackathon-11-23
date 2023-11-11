import { useState } from 'react';

type LocalStorageValue<T> = T | null;
type LocalStorageSetter<T> = (value: LocalStorageValue<T>) => void;
type UseLocalStorageResult<T> = readonly [
  LocalStorageValue<T>,
  LocalStorageSetter<T>,
];

export const useLocalStorage = <T>(key: string): UseLocalStorageResult<T> => {
  const oldValue = window.localStorage.getItem(key);
  const [state, setState] = useState<LocalStorageValue<T>>(
    oldValue === null ? null : JSON.parse(oldValue),
  );

  const setter: LocalStorageSetter<T> = (value) => {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));

    setState(value);
  };

  return [state, setter];
};
