import { useState, useEffect } from 'react';

export default function useLocalStorage(variableName: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    function listenForStorage() {
      const item = window.localStorage.getItem(variableName);

      if (item) {
        console.log(item);
        setValue(item);
      }
    }

    window.addEventListener("storage", listenForStorage);
    return () => {
      window.removeEventListener("storage", listenForStorage);
    };
  }, []);

  return value;
}
