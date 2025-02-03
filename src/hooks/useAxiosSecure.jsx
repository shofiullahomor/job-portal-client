import React, { useEffect } from "react";
import axios from "axios";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";
const axiosInstance = axios.create({
  baseURL: "https://job-portal-server-orpin.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = UseAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("error caught in interceptors", error);
        if (eror.status === 401 || error.status === 403) {
          console.log("need to logout the user");
          signOutUser()
            .then(() => {
              console.log("logged out user");
              navigate("/signin");
            })
            .catch((error) => console.log(error));
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxiosSecure;
