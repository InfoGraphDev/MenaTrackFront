import { useTranslation } from 'react-i18next';

function useIsArabicLanguage() {
    const {i18n}=useTranslation()
    const language=i18n.language=="ar";
    return language;
}

export default useIsArabicLanguage;
