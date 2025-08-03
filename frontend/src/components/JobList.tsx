import React, { useState } from "react";
import { useJobs } from "../context/JobContext";
import { JobCard } from "./JobCard";


const FILTER_OPTIONS = ["All", "Applied", "Reviewed", "Arrived"];
function JobList() {
  const { jobs, updateJobStatus, deleteJob, loading } = useJobs();
  const [filter, setFilter] = useState("All");

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await updateJobStatus(jobId, newStatus);
    } catch (err) {
      console.error("Status update failed:", err.message);
    }
  };
  const handleDelete = async(jobId) => {
    try {
      await deleteJob(jobId)
    } catch (err) {
      console.error("Job Delete Failed", err.message)
    }
  }
  const handleFilter = (status) => {
    setFilter(status);
  };

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  if (loading) return <p className="text-gray-400 text-sm">Loading...</p>;


  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <h3 className="text-sm font-medium text-gray-300">Filter By:</h3>
        <div className="space-x-2">
          {FILTER_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => handleFilter(status)}
              className={`px-3 py-1 text-sm rounded-md border ${
                filter === status
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-transparent text-gray-400 border-gray-700 hover:bg-gray-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      {filteredJobs.length === 0 && (
        <p className="text-gray-500 text-sm italic">
          No jobs Availaible to track{filter !== "All" ? ` for "${filter}" status.` : "."}
        </p>
      )}

      {filteredJobs.map((job) => (
        <JobCard key={job._id} job={job} onStatusChange={handleStatusChange} onDelete={handleDelete}/>
      ))}
    </div>
  );
}

export default JobList;

