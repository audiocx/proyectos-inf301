import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import Home from "./pages/Home";
import BetPage from "./pages/BetPage";
import Login from "./pages/Login";
import { UserProvider } from "./hooks/UserProvider";
import BetHistoryPage from "./pages/BetHistoryPage";
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bet" element={<BetPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/bethistory" element={<BetHistoryPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}
