import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Temperature from "./components/Temperature";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./components/Sidebar";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Humidity from "./components/Humidity";
import Pressure from "./components/Pressure";
import Moon from "./components/Moon";
// import Temperature from "./Temperature";
// Import other pages here

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/temperature" element={<Temperature />} />
        <Route path="/humidity" element={<Humidity />} />
        <Route path="/pressure" element={<Pressure />} />
        <Route path="/Moon" element={<Moon />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
};

// export default AppRouter;

function App() {
  const [count, setCount] = useState(0);
  // const [open, setOpen] = useState(false);

  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };
  return (
    <>
      {/* <div className="background">
        <div className="sidebar-button" onClick={toggleDrawer}>
          <GiHamburgerMenu
            style={{
              color: "#1E0342",
              display: "flex",
              margin: 0
            }}
          />
        </div>
        <Sidebar toggleDrawer={toggleDrawer} open={open} /> */}

        

        <AppRouter />

      {/* </div> */}
    </>
  );
}

export default App;
