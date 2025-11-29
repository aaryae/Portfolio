
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
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
      {/* <LastPage /> */}
      <AboutUs/>
      <ProjectIcons />
      <ContactUs/>
      <Footer />
    </div>
  );
}
