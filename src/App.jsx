import React from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LastPage from "./components/LastPage";
import Navbar from "./components/Navbar";
import Overlay from "./components/Overlay";
import ProjectIcons from "./components/ProjectIcons";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="bg-[#eff7f7]">
      <Navbar />
      <Sidebar />
      <Overlay />
      <Hero />
      <ProjectIcons />
      <LastPage />
      <Footer />
    </div>
  );
}
