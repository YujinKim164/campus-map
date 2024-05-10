import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";

const Div = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  background-color: #ffffff;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
`;

const AppSplash = () => {
  return (
    <ThemeProvider theme={theme}>
      <Div>
        <Logo src={require("../../../Assets/img/Splash.png")} alt="splash" />
      </Div>
    </ThemeProvider>
  );
};

export default AppSplash;
