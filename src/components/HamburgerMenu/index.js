import React from 'react';
import "./HamburgerMenu.css"
const HamburgerMenu = ({ toggleSidebar }) => {
  return (
    <div className="hamburger-menu" onClick={toggleSidebar}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export default HamburgerMenu;
