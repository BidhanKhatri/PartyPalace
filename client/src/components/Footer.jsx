import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("/chat") && (
        <footer className="bg-gradient-to-t from-gray-200 to-transparent max-w-7xl mx-auto min-h-44">
          This is the footer section
        </footer>
      )}
    </>
  );
};

export default Footer;
