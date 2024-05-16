import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";

const AppSettingReport = () => {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <TopAppBar>
        <TopAppBarTxt>{t("feedback")}</TopAppBarTxt>
      </TopAppBar>
      <Link to="/">{t("homePage")}</Link>
    </ThemeProvider>
  );
};

const TopAppBar = styled.div`
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.Primary_blue};
`;

const TopAppBarTxt = styled.div`
  font-size: 20px;
  color: #ffffff;
`;

export default AppSettingReport;
