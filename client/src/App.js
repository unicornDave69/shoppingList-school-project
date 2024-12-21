import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OverviewProvider from "./Providers/OverviewProvider";
import DetailProvider from "./Providers/DetailProvider";
import { UserProvider } from "./Providers/UserProvider";
import Overview from "./Overview/Overview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailItemTable from "./Detail/DetailItemTable";
import DarkMode from "./DarkMode";
import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Loading...</div>}>
        <LanguageSwitcher />
        <UserProvider>
          <OverviewProvider>
            <DetailProvider>
              <Router>
                <DarkMode />
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/lists/:listId" element={<DetailItemTable />} />
                </Routes>
              </Router>
            </DetailProvider>
          </OverviewProvider>
        </UserProvider>
      </Suspense>
    </I18nextProvider>
  );
}

export default App;
