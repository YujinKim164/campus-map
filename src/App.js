import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage";
import MapPage from "./Page/MapPage";
import BuildingPage from "./Page/BuildingPage";
import SettingPage from "./Page/SettingPage";
import ScrollToTop from "./ScrollToTop";
import { ThemeProvider } from "./Contexts/ThemeContext.js";
import { theme } from "./Style/theme";
import "./locales/i18n";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* 기본 화면 설정 */}
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<MapPage />} />
          <Route path="/building" element={<BuildingPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
