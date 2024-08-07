import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Tailwind's 'lg' breakpoint
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col` }>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-1 pt-16 relative">
        <div className="md:hidden">
          <div
            className={
              isOpen
                ? "absolute w-full min-h-screen top-0 left-0 right-0 bottom-0 bg-black/50 pointer-events-none"
                : ""
            }
          ></div>
        </div>
        <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
        <main className={`flex-1 px-4 md:px-8 py-4 mt-10 ml-64 ${isOpen ? "ml-[0px] md:ml-64" : "ml-[0px]"}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
