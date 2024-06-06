import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";
import CaretLeft from "../../../Assets/img/CaretLeft.png";

const AppBuilding = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <TopAppBar>
        <Vector onClick={() => navigate("/")} />
        <TopAppBarTxt>{t("facilities")}</TopAppBarTxt>
      </TopAppBar>
      <MenuDiv onClick={() => navigate("/building/student")}>
        {t("student")}
      </MenuDiv>
      <MenuDiv onClick={() => navigate("/building/happy")}>{t("happiness")}</MenuDiv>
      <MenuDiv onClick={() => navigate("/building/hdh")}>{t("HDH")}</MenuDiv>
      <MenuDiv onClick={() => navigate("/building/oh")}>{t("OH")}</MenuDiv>
      <MenuDiv onClick={() => navigate("/building/nth")}>{t("NTH")}</MenuDiv>
      <MenuDiv onClick={() => navigate("/building/nmh")}>{t("NMH")}</MenuDiv>
      <MenuDiv onClick={() => navigate("/building/anh")}>{t("ANH")}</MenuDiv>
      <MenuDiv onClick={() => navigate("/building/csh")}>{t("CSH")}</MenuDiv>
      <MenuDiv onClick={() => navigate("/building/kgh")}>{t("KGH")}</MenuDiv>
      <MenuDiv onClick={() => navigate("/building/eben")}>{t("EBEN")}</MenuDiv>
      <MenuDiv onClick={() => navigate("/building/glc")}>{t("GLC")}</MenuDiv>
      <MenuDiv onClick={() => navigate("/building/irc")}>{t("IRC")}</MenuDiv>
      <MenuDiv>{t("HCA")}</MenuDiv>

      <Link to="/">홈페이지</Link>
    </ThemeProvider>
  );
};

export default AppBuilding;

const TopAppBar = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  background-color: ${(props) => props.theme.colors.Primary_blue};
`;

const TopAppBarTxt = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.colors.White};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 15px;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black_90};
  border-bottom: 1px solid #dadada;
`;
const Vector = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 11px;
  background-image: url(${CaretLeft});
  background-size: cover;
`;
