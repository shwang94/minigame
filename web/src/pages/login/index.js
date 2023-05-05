import React from 'react';
import {useAuth} from '../../AuthProvider';
import SignIn from '../../components/signin';
import './style.css'

const LoginPage = () => {
 
  const { signInWithGoogle, currentUser } = useAuth();

  if(currentUser !==null) return(<></>);

  return (
    <div className="login-page">
      <div className="login-container">
        <SignIn />
        <div className='center-text-align'>Or</div>
        <button className="google-login-btn" onClick={signInWithGoogle}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="google-logo"
          />
          Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
