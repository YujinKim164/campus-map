import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";

const AppSettingReport = () => {
  const { t } = useTranslation();

  const TabData = [
    { id: 1, button: t("register"), content: "새로운 장소를 등록해주세요." },
    { id: 2, button: t("edit"), content: "장소 정보를 수정해주세요." },
  ];

  const [activeTab, setActiveTab] = useState(TabData[0].id);
  return (
    <ThemeProvider theme={theme}>
      <TopAppBar>
        <TopAppBarTxt>{t("feedback")}</TopAppBarTxt>
      </TopAppBar>
      <FooterBox>
        <TabBox>
          {TabData.map((tab) => (
            <TabButton
              key={tab.id}
              data-active={activeTab === tab.id ? "true" : "false"}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.button}
            </TabButton>
          ))}
        </TabBox>
        <TabContent>
          {TabData.find((a) => a.id === activeTab)?.content}
        </TabContent>
      </FooterBox>
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

const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 9.375rem;
  padding-top: 10px;
`;

const TabBox = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
`;

const TabButton = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: ${({ "data-active": dataActive }) =>
    dataActive === "true" ? "#f0ece3" : "transparent"};
  color: ${({ "data-active": dataActive }) =>
    dataActive === "true" ? "black" : "grey"};
  cursor: pointer;
`;

const TabContent = styled.div`
  padding: 10px;
`;

export default AppSettingReport;
