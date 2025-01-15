import React from 'react';
import LogoutButton from './logOutBtn.js';

const Header = () => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light">
      <h1>Conference Management App</h1>
      <LogoutButton />
    </div>
  );
};

export default Header;