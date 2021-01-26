import React from "react";
import { useAuth } from "../contexts/AuthContext";
import HeaderSidebar from "./HeaderSidebar";

function MainPage() {
  const { currentUser, signout } = useAuth();
  return (
    <div className="mainpage">
      <HeaderSidebar />
    </div>
  );
}

export default MainPage;
