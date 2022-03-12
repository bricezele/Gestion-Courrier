import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationFR from './fr.json';
import translationEN from './en.json';
import {Language} from "../enum/Language.enum";

let defaultLanguage = Language.FR;

const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    }
};
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: defaultLanguage,
        keySeparator: '.',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;