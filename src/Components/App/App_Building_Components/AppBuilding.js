import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";

const AppBuilding = () => {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <TopAppBar>
        <TopAppBarTxt>{t("facilities")}</TopAppBarTxt>
      </TopAppBar>
      <MenuDiv>{t("student")}</MenuDiv>
      <MenuDiv>{t("welfare")}</MenuDiv>
      <MenuDiv>{t("HDH")}</MenuDiv>
      <MenuDiv>{t("OH")}</MenuDiv>
      <MenuDiv>{t("NTH")}</MenuDiv>
      <MenuDiv>{t("NMH")}</MenuDiv>
      <MenuDiv>{t("ANH")}</MenuDiv>
      <MenuDiv>{t("CSH")}</MenuDiv>
      <MenuDiv>{t("KGH")}</MenuDiv>
      <MenuDiv>{t("EBEN")}</MenuDiv>
      <MenuDiv>{t("GLC")}</MenuDiv>
      <MenuDiv>{t("HCA")}</MenuDiv>

      <Link to="/">홈페이지</Link>
    </ThemeProvider>
  );
};

export default AppBuilding;

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
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 15px;
  font-size: 19px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black_90};
  border-bottom: 1px solid #dadada;
`;
