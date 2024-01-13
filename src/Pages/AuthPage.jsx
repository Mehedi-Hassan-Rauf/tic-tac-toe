import { useState } from "react";
import SignIn from "../Components/AuthForm/SignIn";
import SignUp from "../Components/AuthForm/SignUp";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <>
      {isSignIn ? (
        <SignIn setIsSignIn={setIsSignIn} />
      ) : (
        <SignUp setIsSignIn={setIsSignIn} />
      )}
    </>
  );
};

export default AuthPage;
