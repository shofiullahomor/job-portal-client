import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
const SocialLogin = () => {
  const { signinwithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signinwithGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <button onClick={handleGoogleSignIn} className="btn">
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
