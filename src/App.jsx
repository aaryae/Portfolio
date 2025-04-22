import React from "react";
import Hero from "./components/Hero";
import Infocards from "./components/InfoCards";
import Navbar from "./components/Navbar";
import Overlay from "./components/Overlay";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="bg-[#f4f9ff]">
      <Navbar />
      <Sidebar />
      <Overlay />
      <Hero />
    </div>
  );
}
