import React from "react";
import { useState, useEffect } from "react";
import UseAuth from "../hooks/UseAuth";
import { Link } from "react-router-dom";
const MyPostedJob = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = UseAuth();
  useEffect(() => {
    fetch(`https://job-portal-server-orpin.vercel.app/jobs?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, [user.email]);
  return (
    <div>
      <h1>My Posted Job: {jobs.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Job Title</th>
              <th>Deadline</th>
              <th>Application Count</th>
              <th>View Applications </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {jobs.map((job, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{job.title}</td>
                <td>{job.deadline}</td>
                <td>{job.applicationCount}</td>
                <td>
                  <Link to={`/viewApplications/${job._id}`}>
                    <button className="btn btn-link">View Application</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedJob;
