import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router";
import { signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth,email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth,email, password);
  };

  // const signInWithEmailAndPassword = (username,password) =>{
  //   signInWithEmailAndPassword(auth,username,password)
  //     .then((res)={
  //       setCurrentUser(res.user);
  //       navigate('/profile');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        setCurrentUser(res.user);
        navigate('/profile');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signOut = ()=>{
    setCurrentUser(null);
  }
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    signInWithGoogle,
    currentUser,
    setCurrentUser,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
