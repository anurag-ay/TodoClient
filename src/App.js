import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import UserInfoProvider from "./context/userInfoContext";
import UserTaskProvider from "./context/userTaskContext";
import UserCategoryProvider from "./context/userCategoryContext";
import RenderTasksProvider from "./context/renderTasksContext";
import ActiveCategoryProvider from "./context/activeCategoryContext";
import ResponsiveProvider from "./context/responsiveContext";
import IsProgressProvider from "./context/isProgressContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UserInfoProvider>
              <UserTaskProvider>
                <UserCategoryProvider>
                  <RenderTasksProvider>
                    <ActiveCategoryProvider>
                      <ResponsiveProvider>
                        <IsProgressProvider>
                          <Home />
                        </IsProgressProvider>
                      </ResponsiveProvider>
                    </ActiveCategoryProvider>
                  </RenderTasksProvider>
                </UserCategoryProvider>
              </UserTaskProvider>
            </UserInfoProvider>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
