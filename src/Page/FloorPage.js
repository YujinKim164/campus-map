import React from "react";
import { useMediaQuery } from "react-responsive";
import WebHome from "../Components/Web/Web_Home_Components/WebHome";
import AppFloor from "./../Components/App/App_Floor_Components/AppFloor";

const FloorPage = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      {isDesktopOrMobile === true ? (
        <div>
          <AppFloor />
        </div>
      ) : (
        <div>
          <WebHome />
        </div>
      )}
    </>
  );
};

export default FloorPage;
