import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../../AuthProvider';
const HomePage = () => {

  const {currentUser} = useAuth();

  if(currentUser===null) return (
    <div>
      <h1>Welcome to Lucky Dice - Mini Game</h1>
    </div>
  ); 

  return (
    <div>
      <h1>Welcome to Lucky Dice - Mini Game</h1>
      <p>Your email {currentUser.email}. Let's start the game now</p>
      <Link to='/dice'>Go</Link>
    </div>
  );

};

export default HomePage;
