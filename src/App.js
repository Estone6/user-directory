import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./constants/routes";
import "./App.css";

const UserDirectory = lazy(() => import("./components/UserDirectory"));
const UserProfile = lazy(() => import("./components/UserProfile"));

const App = () => {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={routes.userProfile} element={<UserProfile />} />
            <Route path={routes.userDirectory} element={<UserDirectory />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
