import { LocalStorageEnum } from '@/Core/Enums/LocalStorage';

interface GetOption{
  key:LocalStorageEnum,
}

 interface SetOption{
  key:LocalStorageEnum,
  value:any
}

const storageKey = LocalStorageEnum[100];

function useLocalStorageOptions() {
  const setValueLocalStorage = ({key, value}:SetOption) => {
    try {
      const newValue = { ...JSON.parse(window.localStorage.getItem(storageKey)), [key]: value };
      window.localStorage.setItem(storageKey, JSON.stringify(newValue));
    } catch (error) {
    }
  };

  const getValueLocalStorage = ({key}:GetOption) => {
    try {
      const currentValue = JSON.parse(window.localStorage.getItem(storageKey));
      return key in currentValue ? currentValue[key] : null;
    } catch (error) {
      return null;
    }
  };

  return {getValueLocalStorage, setValueLocalStorage};
}

export default useLocalStorageOptions;
