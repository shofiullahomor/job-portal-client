import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/register/Register";
import Signin from "../pages/signin/Signin";
import JobDetail from "../pages/jobDetails/jobDetail";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplication from "../pages/MyApplication";
import AddJob from "../pages/AddJob";
import MyPostedJob from "../pages/MyPostedJob";
import ViewApplications from "../pages/ViewApplications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h1>Route not found</h1>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetail></JobDetail>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://job-portal-server-orpin.vercel.app/jobs/${params.id}`),
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRoute>
            <JobApply> </JobApply>
          </PrivateRoute>
        ),
      },
      {
        path: "/myApplications",
        element: (
          <PrivateRoute>
            <MyApplication></MyApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "/addJob",
        element: (
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        ),
      },
      {
        path: "/myPostedJob",
        element: (
          <PrivateRoute>
            <MyPostedJob></MyPostedJob>
          </PrivateRoute>
        ),
      },
      {
        path: "viewApplications/:job_id",
        element: (
          <PrivateRoute>
            <ViewApplications></ViewApplications>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://job-portal-server-orpin.vercel.app/job-applications/jobs/${params.job_id}`
          ),
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "signin",
        element: <Signin></Signin>,
      },
    ],
  },
]);
export default router;
