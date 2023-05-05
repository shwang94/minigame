import React,{useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider,FacebookAuthProvider  } from 'firebase/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const unregisterAuthObserver = auth
      .onAuthStateChanged((user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          };
          setUser(userData);
          navigate('/');
        }
      });

    return () => unregisterAuthObserver();
  }, [setUser]);


  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL
      };
      setUser(userData);
      navigate('/');
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      setUser(userData);
    } catch (error) {
      console.error('Error during Facebook login:', error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
       
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
      
    </div>
  );
};

export default LoginPage;
