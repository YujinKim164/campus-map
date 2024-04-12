import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";

const Div = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  background-color: #0094ff;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 50%;
  height: auto;
`;

const LogoDiv = styled.div`
  padding-bottom: 100px;
  display: flex;
  //justify-content: center;
  flex-direction: column;
  align-items: center;
  height: auto;
`;

const Title = styled.div`
  color: white;
  margin-bottom: 87px;
  letter-spacing: 17px;
  font-size: 30px;
  font-weight: 700;
`;

const AppSplash = () => {
  return (
    <ThemeProvider theme={theme}>
      <Div>
        <LogoDiv>
          <Title>HGU MAP</Title>
          <Logo
            src={require("../../../Assets/img/HGU-Emblem.png")}
            alt="logo"
          />
        </LogoDiv>
      </Div>
    </ThemeProvider>
  );
};

export default AppSplash;
