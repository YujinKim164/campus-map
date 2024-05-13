import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import TranslationEn from "./translation.en.json";
import TranslationKo from "./translation.ko.json";

// 리소스 객체를 직접 정의합니다.
const resources = {
  en: {
    translation: TranslationEn,
  },
  ko: {
    translation: TranslationKo,
  },
};

i18n
  .use(initReactI18next) // React i18next를 사용하기 위한 초기화
  .use(LanguageDetector) // 브라우저 언어 감지
  .init({
    resources, // 위에서 정의한 리소스 객체를 사용
    lng: "ko", // 기본 언어 설정
    fallbackLng: "en", // 기본 설정 언어가 로드되지 않을 경우 대체 언어
    debug: true, // 디버그 모드 활성화

    // namespace와 key 구분자 설정
    defaultNS: "translation",
    ns: "translation",
    keySeparator: false, // 키 구분자 사용 안 함

    interpolation: {
      escapeValue: false, // XSS 보호 비활성화
    },
  });

export default i18n;
