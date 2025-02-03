import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
const AddJob = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const initialData = Object.fromEntries(formData.entries());
    const { min, max, currency, ...newJob } = initialData;
    newJob.salaryRange = { min, max, currency };
    newJob.requirements = newJob.requirements.split("\n");
    newJob.responsibility = newJob.responsibility.split("\n");
    console.log(newJob);
    fetch("https://job-portal-server-orpin.vercel.app/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Job Has been added.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myPostedJob");
        }
      });
  };
  return (
    <div>
      <h2 className="text-3xl">Post a New Job</h2>
      <form onSubmit={handleAddJob} className="card-body">
        {/* Job title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="input input-bordered"
            required
          />
        </div>
        {/* Location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Location</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="Job Location"
            className="input input-bordered"
            required
          />
          {/* job type */}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Type</span>
          </label>
          <select className="select select-ghost w-full max-w-xs">
            <option disabled>Pick a job type</option>
            <option>Intern</option>
            <option>Part Time</option>
            <option>Full Time</option>
          </select>
        </div>
        {/* category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Category</span>
          </label>
          <select
            defaultValue="Pick a Job type"
            className="select select-ghost w-full max-w-xs"
          >
            <option disabled>Pick a job Category</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>Teaching</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-end">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Salary Range</span>
            </label>
            <input
              type="text"
              name="min"
              placeholder="Job Location"
              className="input input-bordered"
              required
            />
            {/* job type */}
          </div>
          <div className="form-control">
            <input
              type="text"
              name="max"
              placeholder="Max"
              className="input input-bordered"
              required
            />
            {/* job type */}
          </div>

          <div className="form-control">
            <select
              defaultValue="Pick a Job type"
              name="currency"
              className="select select-ghost w-full max-w-xs"
            >
              <option disabled>Pick a job Category</option>
              <option>BDT</option>
              <option>USD</option>
              <option>INR</option>
            </select>
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Description</span>
          </label>
          <textarea
            placeholder="Description"
            name="description"
            className="textarea textarea-bordered textarea-lg w-full max-w-full"
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input
            type="text"
            name="companayName"
            placeholder="Company Name"
            className="input input-bordered"
            required
          />
          {/* job type */}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Requirements</span>
          </label>
          <textarea
            placeholder="Description"
            name="requirements"
            className="textarea textarea-bordered textarea-lg w-full max-w-full"
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Responsibility</span>
          </label>
          <textarea
            placeholder="Responsibility"
            name="responsibility"
            className="textarea textarea-bordered textarea-lg w-full max-w-full"
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">HR Name</span>
          </label>
          <input
            type="text"
            name="hr_name"
            placeholder="HR Name"
            className="input input-bordered"
            required
          />
          {/* job type */}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">HR Email</span>
          </label>
          <input
            type="email"
            name="hr_email"
            defaultValue={user?.email}
            placeholder="HR Email"
            className="input input-bordered"
            required
          />
          {/* job type */}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Deadline</span>
          </label>
          <input
            type="date"
            name="deadline"
            placeholder="Deadline"
            className="input input-bordered"
            required
          />
          {/* job type */}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Logo URL</span>
          </label>
          <input
            type="url"
            name="company_logo"
            placeholder="Company Logo URL"
            className="input input-bordered"
            required
          />
          {/* job type */}
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
