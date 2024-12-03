import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="h-[60px] flex items-center justify-center gap-1">
      &copy; All rights reserved by <Logo type={"footer"} />
    </div>
  );
};

export default Footer;
