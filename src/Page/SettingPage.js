import React from "react";
import { useMediaQuery } from "react-responsive";
import WebHome from "../Components/Web/Web_Home_Components/WebHome";
import AppSetting from "./../Components/App/App_Setting_Components/AppSetting";

const SettingPage = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      {isDesktopOrMobile === true ? (
        <div>
          <AppSetting />
        </div>
      ) : (
        <div>
          <WebHome />
        </div>
      )}
    </>
  );
};

export default SettingPage;
