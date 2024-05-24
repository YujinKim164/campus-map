import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";
import CaretLeft from "../../../Assets/img/CaretLeft.png";

const AppBuildingStudent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [foodClicked, setFoodClicked] = useState(false);
  const [cafeClicked, setCafeClicked] = useState(false);
  const handleFoodClick = () => {
    setFoodClicked(true);
    setCafeClicked(false);
  };

  const handleCafeClick = () => {
    setCafeClicked(true);
    setFoodClicked(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <TopAppBar>
        <Vector onClick={() => navigate("/building")} />
        <TopAppBarTxt>{t("facilityDetail")}</TopAppBarTxt>
      </TopAppBar>
      <Div>
        <BuildingTxt>{t("student")}</BuildingTxt>
        <CategoryDiv>
          <Category onClick={handleFoodClick} clicked={foodClicked}>
            {t("food")}
          </Category>
          <Category onClick={handleCafeClick} clicked={cafeClicked}>
            {t("cafe")}
          </Category>
        </CategoryDiv>
      </Div>
      <Link to="/building">{t("facilities")}</Link>
    </ThemeProvider>
  );
};

export default AppBuildingStudent;

const Div = styled.div`
  padding-left: 23px;
  padding-right: 23px;
  padding-top: 36px;
`;

const TopAppBar = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  background-color: ${(props) => props.theme.colors.Primary_blue};
`;
const Vector = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 11px;
  background-image: url(${CaretLeft});
  background-size: cover;
`;
const TopAppBarTxt = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.colors.White};
  font-size: 20px;
`;

const BuildingTxt = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.colors.black_100};
  font-weight: 500;
  margin-bottom: 21px;
`;

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  margin-bottom: 36px;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  border-radius: 20px;
  color: ${(props) =>
    props.clicked ? props.theme.colors.White : props.theme.colors.Primary_blue};
  background-color: ${(props) =>
    props.clicked ? props.theme.colors.Primary_blue : props.theme.colors.White};
  border: 1px solid;
  border-color: ${(props) =>
    props.clicked ? "transparent" : props.theme.colors.Primary_blue};
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
`;
