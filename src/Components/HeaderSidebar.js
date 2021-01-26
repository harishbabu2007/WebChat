import React, { useState } from "react";
import "./styles/Header.css";
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { SwipeableDrawer } from "@material-ui/core";
import { useAuth } from "../contexts/AuthContext";
import MenuIcon from "@material-ui/icons/Menu";
import Sidebar from "./Sidebar";

function Header() {
  const [drawer, setDraw] = useState({
    left: false,
  });
  const { signout } = useAuth();

  return (
    <div className="header">
      <div className="header__left">
        <IconButton
          style={{ color: "white" }}
          onClick={() => {
            setDraw({ left: true });
          }}
        >
          <MenuIcon />
        </IconButton>
        <h1>Web Chat</h1>
        <p style={{ marginLeft: "10px" }}>by harish</p>
      </div>
      <div>
        <p>Swipe Screen or click menu icon to see more</p>
      </div>
      <IconButton
        onClick={async (e) => await signout()}
        style={{ color: "white" }}
      >
        <ExitToAppIcon />
      </IconButton>
      <SwipeableDrawer
        onOpen={() => setDraw({ left: true })}
        anchor="left"
        open={drawer.left}
        onClose={() => setDraw({ left: false })}
        style={{}}
      >
        <Sidebar />
      </SwipeableDrawer>
    </div>
  );
}

export default Header;
