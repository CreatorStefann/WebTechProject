import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
  
      navigate('/');
    };
  
    return (
      <button 
        className="btn btn-danger" 
        onClick={handleLogout}
      >
        Log Out
      </button>
    );
  };
  
  export default LogoutButton;