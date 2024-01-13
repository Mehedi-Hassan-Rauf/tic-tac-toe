import { useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const AuthContext = createContext(null);

export function AuthContextProviderMain({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const logIn = (email, pass) => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((res) => {
        //console.log(res);
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signUp = (name, email, pass) => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logOut = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    navigate("/auth");
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    navigate("/");
  }, []);

  const providerValue = { user, logIn, signUp, logOut };
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
