import React from "react";
import Lottie from "lottie-react";
import lottieLogin from "../../assets/login.json";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import SocialLogin from "../shared/SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const { signinUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  const handleSignin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signinUser(email, password)
      .then((result) => {
        console.log("signin user", result.user.email);
        const user = { email: email };
        axios
          .post("https://job-portal-server-orpin.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });

        // navigate(from);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-14">
        <div className="text-center lg:text-left">
          <Lottie animationData={lottieLogin}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl font-bold text-center p-4">Login now!</h1>
          <form onSubmit={handleSignin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="text-center my-4">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
