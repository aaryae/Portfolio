import React from "react";
import Aboutus from "./Aboutus";
import Contactus from "./Contactus";

const LastPage = () => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap  ">
      <Aboutus />
      <Contactus />
    </div>
  );
};

export default LastPage;
