import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import TranslationEn from "./en/translation.json";
import TranslationKo from "./ko/translation.json";

const resource = {
  en: {
    translations: TranslationEn,
  },
  ko: {
    translations: TranslationKo,
  },
};

i18n
  .use(initReactI18next)
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    lng: "ko",
    fallbackLng: "ko", // 기본 설정 언어,
    debug: true,
    defaultNS: "translations",
    ns: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
