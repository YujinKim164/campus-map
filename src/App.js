import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage";
import MapPage from "./Page/MapPage";
import BuildingPage from "./Page/BuildingPage";
import SettingPage from "./Page/SettingPage";
import ScrollToTop from "./ScrollToTop";
import { ThemeProvider } from "./Contexts/ThemeContext.js";
import { theme } from "./Style/theme";
import "./locales/i18n";
import AppBuildingStudent from "./Components/App/App_Building_Components/AppBuildingStudent";
import AppBuildingOH from "./Components/App/App_Building_Components/AppBuildingOH";
import AppBuildingNTH from "./Components/App/App_Building_Components/AppBuildingNTH";
import AppBuildingGLC from "./Components/App/App_Building_Components/AppBuildingGLC";
import AppBuildingNMH from "./Components/App/App_Building_Components/AppBuildingNMH";
import AppBuildingEBEN from "./Components/App/App_Building_Components/AppBuildingEBEN";
import AppBuildingANH from "./Components/App/App_Building_Components/AppBuildingANH";
import AppBuildingHDH from "./Components/App/App_Building_Components/AppBuildingHDH";
import AppBuildingHappy from "./Components/App/App_Building_Components/AppBuildingHappy";
import AppBuildingIRC from "./Components/App/App_Building_Components/AppBuildingIRC";
import AppBuildingCSH from "./Components/App/App_Building_Components/AppBuildingCSH";
import AppBuildingKGH from "./Components/App/App_Building_Components/AppBuildingKGH";
import AppBuildingHCA from "./Components/App/App_Building_Components/AppBuildingHCA";
import AppSettingReport from "./Components/App/App_Setting_Components/AppSettingReport";
import AppMapChipDetail from "./Components/App/App_Map_Components/AppMapChipDetail";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* 기본 화면 설정 */}
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<MapPage />} />
          <Route path="/chip" element={<AppMapChipDetail />} />
          <Route path="/building" element={<BuildingPage />} />
          <Route path="/building/student" element={<AppBuildingStudent />} />
          <Route path="/building/oh" element={<AppBuildingOH />} />
          <Route path="/building/nth" element={<AppBuildingNTH />} />
          <Route path="/building/glc" element={<AppBuildingGLC />} />
          <Route path="/building/nmh" element={<AppBuildingNMH />} />
          <Route path="/building/eben" element={<AppBuildingEBEN />} />
          <Route path="/building/anh" element={<AppBuildingANH />} />
          <Route path="/building/hdh" element={<AppBuildingHDH />} />
          <Route path="/building/happy" element={<AppBuildingHappy />} />
          <Route path="/building/irc" element={<AppBuildingIRC />} />
          <Route path="/building/csh" element={<AppBuildingCSH />} />
          <Route path="/building/kgh" element={<AppBuildingKGH />} />
          <Route path="/building/hca" element={<AppBuildingHCA />} />

          <Route path="/setting" element={<SettingPage />} />
          <Route path="/setting/report" element={<AppSettingReport />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
