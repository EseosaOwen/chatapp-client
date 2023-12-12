import { useEffect, useState } from "react";

const PREFIX = `chatapp-`;

type TUseLocalStorageProps = {
  key?: string;
  initialValue?: any;
};

export default function useLocalStorage({
  key,
  initialValue,
}: TUseLocalStorageProps) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (value) {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    }
  }, [prefixedKey, value]);

  return [value, setValue];
}
