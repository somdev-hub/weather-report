import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";

const Background = (WrappedComponent) => {
  return () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
      setOpen(!open);
    };
    return (
      <div className="background">
        <div className="sidebar-button" onClick={toggleDrawer}>
          <GiHamburgerMenu
            style={{
              color: "#1E0342",
              display: "flex",
              margin: 0
            }}
          />
        </div>
        <Sidebar toggleDrawer={toggleDrawer} open={open} />

        {/* <AppRouter /> */}
        <WrappedComponent />
      </div>
    );
  };
};

export default Background;
