import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import image from "../constant/image";

const Contactus = () => {
  return (
    <div
      className="bg-[#c7d6c7] w-full flex flex-col items-center justify-center px-4 relative overflow-hidden py-16"
      id="contactme"
    >
      <img
        src={image.mandala}
        className="absolute w-[800px] right-[-400px] bottom-[-400px] slowspin pointer-events-none opacity-10"
        alt="Mandala"
      />
      <img
        src={image.mandala}
        className="absolute w-[800px] left-[0] bottom-[-400px] slowspin pointer-events-none opacity-10"
        alt="Mandala"
      />
      <img
        src={image.mandala}
        className="absolute w-[800px] right-[500px] bottom-[400px] slowspin pointer-events-none opacity-10"
        alt="Mandala"
      />
      <img
        src={image.mandala}
        className="absolute w-[800px] right-[1500px] bottom-0 slowspin pointer-events-none opacity-10"
        alt="Mandala"
      />
      <img
        src={image.mandala}
        className="absolute w-[800px] right-[1500px] bottom-[400px] slowspin pointer-events-none opacity-10"
        alt="Mandala"
      />
      <img
        src={image.mandala}
        className="absolute w-[800px] right-0 bottom-[-1400px] slowspin pointer-events-none opacity-10"
        alt="Mandala"
      />
      <img
        src={image.mandala}
        className="absolute w-[800px] right-[700px] bottom-[700px] slowspin pointer-events-none opacity-10"
        alt="Mandala"
      />
      <img
        src={image.mandala}
        className="absolute w-[800px] left-[1500px] bottom-50 slowspin pointer-events-none opacity-10"
        alt="Mandala"
      />

      <form
        action="https://getform.io/f/your-unique-endpoint-id"
        method="POST"
        className="p-8 w-full max-w-2xl space-y-6 z-10 bg-white rounded-xl shadow-md"
      >
        {/* Hidden fields */}
        <input type="hidden" name="_gotcha" style={{ display: "none" }} />
        <input
          type="hidden"
          name="_subject"
          value="New message from Portfolio!"
        />
        <input
          type="hidden"
          name="_redirect"
          value="https://aaryadangol.com.np/thank-you"
        />

        <h2
          className="text-5xl sm:text-5xl font-extrabold text-center text-[#1a3659] underline"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Contact Me
        </h2>

        <div data-aos="fade-up" data-aos-duration="900">
          <label className="block text-gray-700 mb-2 text-lg font-medium">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full bg-gray-50 outline-none border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-[#1a3659]"
            placeholder="Enter your name"
          />
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <label className="block text-gray-700 mb-2 text-lg font-medium">
            Message
          </label>
          <textarea
            name="message"
            required
            rows="5"
            className="w-full bg-gray-50 outline-none border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-[#1a3659]"
            placeholder="Enter your message"
          ></textarea>
        </div>

        <button
          type="submit"
          data-aos="fade-up"
          data-aos-duration="1100"
          className="w-full bg-[#1a3659] text-white py-4 rounded-lg text-lg hover:bg-[#0f2545] transition-all"
        >
          Send Message
        </button>
      </form>

      {/* Social Icons */}
      <div
        className="flex space-x-6 mt-10 text-[#1a3659] text-2xl z-10"
        data-aos="fade-up"
        data-aos-duration="1300"
      >
        <a
          href="https://www.linkedin.com/in/aaryae/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-transform duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/aaryae"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-transform duration-300"
        >
          <FaGithub />
        </a>
        <a
          href="https://instagram.com/aaryae_"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-transform duration-300"
        >
          <FaInstagram />
        </a>
        <a
          href="mailto:aaryaed@gmail.com"
          className="hover:scale-125 transition-transform duration-300"
        >
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
};

export default Contactus;
