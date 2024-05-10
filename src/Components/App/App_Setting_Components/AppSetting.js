import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// theme 파일 폰트 적용 방법 + style-components 사용
const Header1 = styled.div`
  font-size: ${(props) => props.theme.Web_fontSizes.Header1};
  font-weight: ${(props) => props.theme.fontWeights.Header1};
  line-height: ${(props) => props.theme.LineHeight.Header1};
  color: ${(props) => props.theme.colors.secondary};
  font-family: "Pretendard";
`;
// 설정 버튼 컴포넌트화

const AppSetting = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    i18n.changeLanguage(currentLanguage === "ko" ? "en" : "ko");
  };

  return (
    <ThemeProvider theme={theme}>
      <TopAppBar>
        <TopAppBarTxt>설정</TopAppBarTxt>
      </TopAppBar>
      <Header1>설정 페이지입니다.</Header1>
      <button onClick={toggleLanguage}>설정</button>
      <Link to="/">홈 페이지</Link>
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
