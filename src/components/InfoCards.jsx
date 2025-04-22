import React from "react";

const InfoCards = () => {
  const cards = [
    {
      title: "Administrators",
      description:
        "Support your curriculum needs while providing memorable learning experiences.",
      color: "#00738c",
      bgColor: "#e6f3f5",
    },
    {
      title: "Teachers",
      description:
        "Elevate every lesson with products that enhance instructional practices.",
      color: "#703dd5",
      bgColor: "#eee4fc",
    },
    {
      title: "At Home",
      description:
        "Capture kids' attention from start to finish with irresistible learning.",
      color: "#f66a21",
      bgColor: "#fde8d6",
    },
  ];

  return (
    <div
      data-aos="fade-up"
      className="bg-white shadow-lg rounded-2xl p-10 max-w-7xl mx-auto mt-20 flex flex-col md:flex-row items-center justify-between gap-6  z-10 relative"
    >
      {cards.map(({ title, description, color, bgColor }, idx) => (
        <div key={title} className="flex flex-col items-center flex-1">
          <h2 className="font-bold text-2xl" style={{ color }}>
            {title}
          </h2>
          <p className="text-gray-700 mt-2 text-center">{description}</p>
          <div className="mt-4">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full shadow-lg"
              style={{ backgroundColor: bgColor }}
            >
              <span className="text-xl" style={{ color }}>
                ⬇
              </span>
            </div>
          </div>
          {idx < cards.length - 1 && (
            <div className="hidden md:block absolute top-1/4 h-24 w-px bg-gray-200 right-1/3"></div>
          )}
        </div>
      ))}
    </div>
  );
};
export default InfoCards;
