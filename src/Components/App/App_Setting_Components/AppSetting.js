import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// i18n을 import
import i18n from "../../../locales/i18n";

// theme 파일 폰트 적용 방법 + style-components 사용
const Header1 = styled.div`
  font-size: ${(props) => props.theme.Web_fontSizes.Header1};
  font-weight: ${(props) => props.theme.fontWeights.Header1};
  line-height: ${(props) => props.theme.LineHeight.Header1};
  color: ${(props) => props.theme.colors.secondary};
  font-family: "Pretendard";
`;

const AppSetting = () => {
  const { t } = useTranslation();

  // 언어 변경 함수
  const clickHandler = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ThemeProvider theme={theme}>
      <TopAppBar>
        <TopAppBarTxt>{t("Settings")}</TopAppBarTxt>
      </TopAppBar>
      <button onClick={() => clickHandler("ko")}>KO</button>
      <button onClick={() => clickHandler("en")}>EN</button>

      <Link to="/">{t("homePage")}</Link>
    </ThemeProvider>
  );
};

const TopAppBar = styled.div`
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: #0094ff;
`;

const TopAppBarTxt = styled.div`
  font-size: 20px;
  color: #ffffff;
`;

export default AppSetting;
