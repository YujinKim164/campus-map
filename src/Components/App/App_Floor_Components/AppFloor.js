import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { Link } from "react-router-dom";

// theme 파일 폰트 적용 방법 + style-components 사용
const Header1 = styled.div`
  font-size: ${(props) => props.theme.Web_fontSizes.Header1};
  font-weight: ${(props) => props.theme.fontWeights.Header1};
  line-height: ${(props) => props.theme.LineHeight.Header1};
  color: ${(props) => props.theme.colors.secondary};
  font-family: "Pretendard";
`;

const AppFloor = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header1>층별 시설 안내 페이지입니다.</Header1>
      <Link to="/">홈 페이지</Link>
    </ThemeProvider>
  );
};

export default AppFloor;
