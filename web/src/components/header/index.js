import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import {useAuth} from '../../AuthProvider';


const Header = () => {
  
  const {  currentUser,signOut } = useAuth();
  return (
    <header className='header'>
    <nav className='nav'>
      
      {currentUser && (
        <>
          <Link className='link' to="/">Home</Link>
          <Link className='link' to="/dice">Dice</Link>
          <Link className='link' to="/user">Users</Link>
          <Link className='link' to="/history">History</Link>
        </>
      )}
    </nav>
    {currentUser ? (
      <div>
        Welcome, <span className='user'><Link className='link' to='/profile'>{currentUser.email}</Link></span>
        <button className="right-aligned-button" onClick={signOut} >Log out</button>
      </div>
    ) : (
      <Link className='link' to="/login">Login</Link>
    )}
  </header>
  );
};

export default Header;
