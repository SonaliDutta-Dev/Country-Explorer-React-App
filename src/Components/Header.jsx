import React from 'react';

const Header = ({ toggleTheme, isDark }) => {
  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="title">Where in the world?</h1>
        <p className="theme-changer" onClick={toggleTheme}>
          <i className={isDark ? 'fa-solid fa-sun' : 'fa-regular fa-moon'}></i>&nbsp;&nbsp;
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </p>
      </div>
    </header>
  );
};

export default Header;