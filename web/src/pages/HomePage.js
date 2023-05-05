import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
const HomePage = () => {
  const {user} = useContext(UserContext);

  if(user===null) return (
    <div>
      <h1>Welcome to Lucky Dice - Mini Game</h1>
    </div>
  ); 
  return (
    <div>
      <h1>Welcome to Lucky Dice - Mini Game</h1>
      <p>Your email {user.email}. Let's start the game now</p>
      <Link to='/dice'>Go</Link>
    </div>
  );
};

export default HomePage;
