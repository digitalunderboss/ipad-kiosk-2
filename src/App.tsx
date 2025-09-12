import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BulletinPage from "./pages/BulletinPage";
import BibleStudyPage from "./pages/BibleStudyPage";
import MembershipPage from "./pages/MembershipPage";
import VolunteerPage from "./pages/VolunteerPage";

export default function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bulletin" element={<BulletinPage />} />
        <Route path="/bible-study" element={<BibleStudyPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
      </Routes>
    </FluentProvider>
  );
}