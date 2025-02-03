import React from "react";
import { useParams } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const JobApply = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const navigate = useNavigate();
  console.log(id);
  console.log(user);

  const submitJobApplication = (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedIn = form.linkedin.value;
    const github = form.github.value;
    const resume = form.resume.value;
    console.log(linkedIn, github, resume);

    const jobApplication = {
      job_id: id,
      applicant_email: user.email,
      linkedIn,
      github,
      resume,
    };
    fetch("https://job-portal-server-orpin.vercel.app/job-applications", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myApplications");
        }
      });
  };
  return (
    <div
      className="card bg-base-100 w-full 
     shadow-2xl container mx-auto"
    >
      <form onSubmit={submitJobApplication} className="card-body">
        <h1 className="text-5xl font-bold text-center">Apply now!</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">LinkedIn URL</span>
          </label>
          <input
            type="url"
            name="linkedin"
            placeholder="Linked In URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Github URL</span>
          </label>
          <input
            type="url"
            name="github"
            placeholder="Github URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Resume URL</span>
          </label>
          <input
            type="url"
            name="resume"
            placeholder="Resume URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApply;
