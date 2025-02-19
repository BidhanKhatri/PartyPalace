import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { socket } from "../../socket";

const Layout = () => {
  socket.connect();
  socket.on("connect", () => {
    console.log("socket connected");
  });
  return (
    <div>
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
