import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Common_ar from './Languages/ar/Common.json';
import Common_en from './Languages/en/Common.json';

const lang = localStorage.getItem("lang") || 'en'
const resources = {
    en: {
        common: Common_en
    },
    ar: {
        common: Common_ar
    }
};
i18n.use(initReactI18next)
.init({
    interpolation: { escapeValue: false },
    resources,
    lng: lang,

    keySeparator: false,
    interpolation:{
        escapeValue:false,
    }
});
export default i18n;