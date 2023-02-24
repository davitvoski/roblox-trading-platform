import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/website/Navbar";
import Login from "./pages/auth/Login";

function App() {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
