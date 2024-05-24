import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";
import Modal from "react-modal";
import CaretRight from "../../../Assets/img/CaretRight.png";
import CaretLeft from "../../../Assets/img/CaretLeft.png";

Modal.setAppElement("#root");

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
            <LeftVector onClick={() => navigate("/")} />
            <TopAppBarTxt>{t("settings")}</TopAppBarTxt>
          </TopAppBar>
          <MenuDiv>{t("size")}</MenuDiv>
          <MenuDiv onClick={openModal}>
            {t("language")}
            <LanguageDetail>
              {t("ko")}
              <Vector />
            </LanguageDetail>
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
              {t("cancel")}
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
    width: "293px",
    borderRadius: "10px",
    textAlign: "center",
    padding: "0",
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
  align-items: center;
  background-color: ${(props) => props.theme.colors.Primary_blue};
`;

const LeftVector = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 11px;
  background-image: url(${CaretLeft});
  background-size: cover;
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
  display: flex;
  align-items: center;
  margin-right: 13px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.Primary_blue};
`;

const Vector = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${CaretRight});
  background-size: cover;
`;

const Copyright = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.gray_20};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 30px 0 22px 30px;
  color: ${(props) => props.theme.colors.black_90};
`;

const ModalButton = styled.div`
  display: flex;
  text-align: left;
  padding: 15px 0 15px 30px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #dadada;
  color: ${(props) => props.theme.colors.Primary_blue};
`;

const ModalCloseButton = styled.div`
  text-align: right;
  margin-top: 79px;
  padding: 0 30px 20px 0;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.gray_70};
`;

export default AppSetting;
