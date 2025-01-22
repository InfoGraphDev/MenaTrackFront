import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en.json';
import translationAR from './locales/ar.json'; 
import { LocalStorageEnum } from '@/Core/Enums/LocalStorage';

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR } 
};

const getDirection = (lng: string): 'ltr' | 'rtl' => {
  return lng === 'ar' ? 'rtl' : 'ltr'; 
};  

let haveLanguage = localStorage.getItem(LocalStorageEnum[100]);
let language="ar";
if(haveLanguage){
  let item=JSON.parse(haveLanguage)
  if (item && LocalStorageEnum[0] in item) {
    language=item[LocalStorageEnum[0]]
  } 
}
document.dir = getDirection(language);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: language,
    fallbackLng: 'ar',
    keySeparator: '.',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
