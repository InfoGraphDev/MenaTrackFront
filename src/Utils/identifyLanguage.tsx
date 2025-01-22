export function identifyLanguage(str) {
    const arabicRegex = /[\u0600-\u06FF]/;
    const englishRegex = /[A-Za-z]/;

    const hasArabic = arabicRegex.test(str);
    const hasEnglish = englishRegex.test(str);
    
    if (hasArabic) {
        return 'ar';
    } else if (hasEnglish) {
        return 'en';
    } else{
        return 'en';
    }
}

export function CreateQueryDependLanguage(str,arabic="ARABIC_NAME",english="ENGLISH_NAME"){
    if(str==""){
        return ``
    }else{
        if(identifyLanguage(str)=="ar"){
            return `${arabic} like '%${str}%'`
        }else if(identifyLanguage(str)=="en"){
            return `${english} like '%${str}%'`
        }
    }
}

