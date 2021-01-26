import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase";

const AuthProvider = createContext();

export const useAuth = () => {
  return useContext(AuthProvider);
};

export function AuthContext({ children }) {
  const [currentUser, setUser] = useState(null);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signout = () => {
    return auth.signOut();
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const forgotPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const change = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return change;
  }, []);

  const values = {
    currentUser,
    signup,
    signout,
    login,
    forgotPassword,
  };
  return (
    <AuthProvider.Provider value={values}>{children}</AuthProvider.Provider>
  );
}
