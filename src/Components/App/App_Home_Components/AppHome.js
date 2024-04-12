import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
import { useNavigate } from "react-router-dom";
import AppSplash from "../App_Splash_Components/AppSplash";
import MapPage from "./../../../Page/MapPage";

const Div = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const MarkerLogo = styled.img`
  width: 30%;
  height: auto;
  margin-bottom: 89px;
`;
const Button = styled.button`
  width: 280px;
  height: 60px;
  border: none;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background: #50abff;
  font-size: 25px;
  font-weight: 600;
  color: white;
  margin-bottom: 35px;
`;

const AppHome = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2초 후 스플래시 화면 사라짐
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <AppSplash />
      ) : (
        <Div>
          <MarkerLogo src={require("../../../Assets/img/Logo.jpg")} />
          <Button onClick={() => navigate("/map")}>길찾기</Button>
          <Button>층별 시설</Button>
          <Button>주요 시설 정보</Button>
          <Button>설정</Button>
          {/* <div>
            <Link to="/map">HGU 캠퍼스 맵</Link>
          </div> */}
        </Div>
      )}
    </ThemeProvider>
  );
};

export default AppHome;
