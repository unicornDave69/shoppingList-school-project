import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OverviewProvider from "./Providers/OverviewProvider";
import DetailProvider from "./Providers/DetailProvider";
import { UserProvider } from "./Providers/UserProvider";
import Detail from "./Detail/Detail";
import Overview from "./Overview/Overview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailItemTable from "./Detail/DetailItemTable";

function App() {
  return (
    <UserProvider>
      <OverviewProvider>
        <DetailProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route
                path="/api/lists/:listId"
                element={<Detail DetailItemTable={DetailItemTable} />}
              />
            </Routes>
          </Router>
        </DetailProvider>
      </OverviewProvider>
    </UserProvider>
  );
}

export default App;
