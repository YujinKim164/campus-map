import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage";
import MapPage from "./Page/MapPage";
import FloorPage from "./Page/FloorPage";
import SettingPage from "./Page/SettingPage";
import ScrollToTop from "./ScrollToTop";
import { ThemeProvider } from "./Contexts/ThemeContext.js";
import { theme } from "./Style/theme";
import "./i18n";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* 기본 화면 설정 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/floor" element={<FloorPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
