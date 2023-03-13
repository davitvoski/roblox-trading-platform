import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/website/Navbar";
import Login from "./pages/auth/Login";

function App() {
  return (
    <div className="h-screen w-screen">
      <div className="h-[10%]">
        <Navbar />
      </div>
      <div className="h-[90%]">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
