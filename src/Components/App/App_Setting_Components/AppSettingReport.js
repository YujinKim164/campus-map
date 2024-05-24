import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../locales/i18n";
import Modal from "react-modal";
import CaretLeft from "../../../Assets/img/CaretLeft.png";

const AppSettingReport = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const TabData = [
    { id: 1, button: t("register"), content: "새로운 장소를 등록해주세요." },
    { id: 2, button: t("edit"), content: "장소 정보를 수정해주세요." },
  ];
  const [activeTab, setActiveTab] = useState(TabData[0].id);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <TopAppBar>
        <Vector onClick={() => navigate("/setting")} />
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
      <ReportButton onClick={openModal}>{t("report")}</ReportButton>
      {/* 모달 창 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Language Selection"
        style={customStyles}
      >
        <ModalContent>
          <ModalDetail>{t("reportModal")}</ModalDetail>
          <ModalCloseButton onClick={closeModal}>{t("ok")}</ModalCloseButton>
        </ModalContent>
      </Modal>
      <Link to="/">{t("homePage")}</Link>
    </ThemeProvider>
  );
};

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
  font-size: 20px;
  color: #ffffff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
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

const ReportButton = styled.div`
  text-align: right;
  padding: 16px 30px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black_90};
`;

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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ModalDetail = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding: 30px 24px 0 24px;
  color: ${(props) => props.theme.colors.black_90};
`;

const ModalCloseButton = styled.div`
  text-align: right;
  margin-top: 29px;
  padding: 0 30px 20px 0;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.Primary_blue};
`;

export default AppSettingReport;
