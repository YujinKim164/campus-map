import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";
import Modal from "react-modal";

const AppSetting = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 현재 언어 상태 가져오기
  const currentLanguage = i18n.language;

  // 언어 변경 함수
  const clickHandler = (lang) => {
    i18n.changeLanguage(lang);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Content>
          <TopAppBar>
            <TopAppBarTxt>{t("settings")}</TopAppBarTxt>
          </TopAppBar>
          <MenuDiv>{t("size")}</MenuDiv>
          <MenuDiv onClick={openModal}>
            {t("language")}
            {/* <MenuDetail>{currentLanguage.toUpperCase()}</MenuDetail> */}
            <LanguageDetail>{t("ko")}</LanguageDetail>
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

        {/* 모달 창 */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Language Selection"
          style={customStyles}
        >
          <ModalContent>
            <ModalTitle>{t("language")}</ModalTitle>
            <ModalButton onClick={() => clickHandler("ko")}>
              {t("ko")}
            </ModalButton>
            <ModalButton onClick={() => clickHandler("en")}>
              {t("en")}
            </ModalButton>
            <ModalCloseButton onClick={closeModal}>
              {t("close")}
            </ModalCloseButton>
          </ModalContent>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
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
  cursor: pointer;
`;

const MenuDetail = styled.div`
  margin-right: 17px;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black_90};
`;
const LanguageDetail = styled.div`
  margin-right: 17px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.Primary_blue};
`;
const Copyright = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.gray_20};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 20px;
  color: ${(props) => props.theme.colors.black_90};
`;

const ModalButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.Primary_blue};
  color: ${(props) => props.theme.colors.White};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.Primary_blue_hover};
  }
`;

const ModalCloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.gray_20};
  color: ${(props) => props.theme.colors.black_90};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.gray_30};
  }
`;

export default AppSetting;
