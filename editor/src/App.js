import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { DevSpaceScreen } from "./screens/DevSpaceScreen";
import { DevSpaceProviders } from "./Providers/DevSpaceProviders";
import { ModalProvider } from "./Providers/ModalProvider";
function App() {
  return (
    <DevSpaceProviders>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route
              path="/devSpace/:folderId/:fileId"
              element={<DevSpaceScreen />}
            />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </DevSpaceProviders>
  );
}

export default App;
