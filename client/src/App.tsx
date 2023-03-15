import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/website/Navbar";
import Login from "./pages/auth/Login";

function App() {
  return (
    <div className="h-screen w-screen">
      <div className="h-[10%] min-h-[4em]">
        <Navbar />
      </div>
      <main className="h-[90%]">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
