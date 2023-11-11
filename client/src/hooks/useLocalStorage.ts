import {useState} from 'react';

type LocalStorageValue = string | null;
type LocalStorageSetter = (value: LocalStorageValue) => void;
type UseLocalStorage = (key: string) => readonly [LocalStorageValue, LocalStorageSetter];

export const useLocalStorage: UseLocalStorage = key => {
  const [state, setState] = useState<LocalStorageValue>(
    window.localStorage.getItem(key),
  );

  const setter: LocalStorageSetter = value => {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);

    setState(value);
  };

  return [state, setter];
};