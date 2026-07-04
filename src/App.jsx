import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Overlay from "./components/Overlay";
import Projects from "./components/Projects";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="bg-[#fbf8ef] overflow-x-hidden">
      <Navbar />
      <Sidebar />
      <Overlay />
      <Hero />
      <AboutUs />
      <Projects />
      <ContactUs />
      <Footer />
    </div>
  );
}
