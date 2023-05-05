import React,{useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css'
import UserContext from '../../UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const loginClick= ()=>{
    navigate('/login');
  }
  const logoutClick= async ()=>{
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
    
  }
  return (
    <header className='header'> 
      <nav className='nav'>
        <Link className='link' to="/">Home</Link>
        <Link className='link' to="/dice">Lucky Dice</Link>
        <Link className='link' to="/history">History</Link>
      </nav>
      {user ? (
        <div className='user'>Welcome, {user.displayName}! 
        <button className='login-button' onClick={logoutClick}>Logout</button>
        </div> 
        
      ) : (
        <button className='login-button' onClick={loginClick}>Login</button>
      )}
    </header>
  );
};

export default Header;
