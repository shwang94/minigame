import React from 'react';

import './profile.css'
import {useAuth} from '../../AuthProvider';


const Profile = () => {
  
  const {  currentUser } = useAuth();
  
  return (
    <div className="profile-container">
       
        <img src={currentUser.photoURL} alt="Profile" />
        <h2>{currentUser.displayName}</h2>
        <p>UID: {currentUser.uid}</p>
        <p>Email: {currentUser.email}</p>
    </div>
  );

};

export default Profile;
