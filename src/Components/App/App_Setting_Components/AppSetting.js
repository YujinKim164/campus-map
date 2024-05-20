import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";

const AppSetting = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 언어 변경 함수
  const clickHandler = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Content>
          <TopAppBar>
            <TopAppBarTxt>{t("settings")}</TopAppBarTxt>
          </TopAppBar>
          <MenuDiv>{t("size")}</MenuDiv>
          <MenuDiv>
            {t("language")}
            <button onClick={() => clickHandler("ko")}>KO</button>
            <button onClick={() => clickHandler("en")}>EN</button>
          </MenuDiv>
          <MenuDiv onClick={() => navigate("/setting/report")}>
            {t("feedback")}
          </MenuDiv>
          <MenuDiv>
            {t("version")}
            <MenuDetail>1.0.0</MenuDetail>
          </MenuDiv>
          <MenuDiv>
            {t("mapVersion")} <MenuDetail>3.17.0</MenuDetail>
          </MenuDiv>
        </Content>
        <Bottom>
          <Copyright>© SE8. All Rights Reserved</Copyright>
          <Link to="/">{t("homePage")}</Link>
        </Bottom>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

const Bottom = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const TopAppBar = styled.div`
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.Primary_blue};
`;

const TopAppBarTxt = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.colors.White};
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 26px;
  padding-bottom: 26px;
  padding-left: 22px;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black_90};
  border-bottom: 1px solid #dadada;
`;
const MenuDetail = styled.div`
  margin-right: 17px;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black_90};
`;

const Copyright = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.gray_20};
`;

export default AppSetting;
