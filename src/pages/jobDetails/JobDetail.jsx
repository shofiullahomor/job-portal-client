import React from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
const JobDetail = () => {
  const { _id, title, company, applicationDeadline } = useLoaderData();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl m-10">jobs details for {title}</h1>
      <p>Apply for : {company}</p>
      <p>Deadline : {applicationDeadline}</p>
      <Link to={`/jobApply/${_id}`}>
        <button className="btn btn-primary">Apply Now</button>
      </Link>
    </div>
  );
};

export default JobDetail;
