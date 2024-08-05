import { useState } from "react";

type UseLocalStorageType = {
  keyName: string;
  defaultValue: StoredValueType | null;
};
export type StoredValueType = {
  authenticated: boolean;
  user: {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    password: string;
    profileDesc: string;
    profileId: number;
    profileImage: string&Blob&File;
    token: string;
    username: string;
  };
};
type UseLocalStorageReturnType = [
  StoredValueType | null,
  (newValue: StoredValueType | null) => void
];

export const useLocalStorage = ({
  keyName,
  defaultValue,
}: UseLocalStorageType): UseLocalStorageReturnType => {
  const [storedValue, setStoredValue] = useState<StoredValueType | null>(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: StoredValueType | null) => {
    try {
      window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
