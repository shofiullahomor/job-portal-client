import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
const ViewApplications = () => {
  const handleStatusUpdate = (e, id) => {
    console.log(e.target.value, id);
    const data = {
      status: e.target.value,
    };
    fetch(`https://job-portal-server-orpin.vercel.app/job-applications/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Status has been updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const applications = useLoaderData();
  return (
    <div className="my-10">
      <h1 className="text-center text-3xl font-bold">
        view applications: {applications.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Email</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {applications.map((app, index) => (
              <tr key={app._id}>
                <th>{index + 1}</th>
                <td>{app.applicant_email}</td>
                <td>Quality Control Specialist</td>
                <td>
                  <select
                    onChange={(e) => handleStatusUpdate(e, app._id)}
                    defaultValue={app.status || "change status"}
                    className="select select-bordered select-xs w-full max-w-xs"
                  >
                    <option disabled>Change Status</option>
                    <option>Under Review</option>
                    <option>Interview Call</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
