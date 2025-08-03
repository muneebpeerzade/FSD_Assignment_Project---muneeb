import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as jobAPI from "../utils/api"; 

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await jobAPI.fetchJobs();
      setJobs(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createJob = async (job) => {
    await jobAPI.createJob(job);
    await loadJobs();
  };

  const updateJob = async (id, updated) => {
    await jobAPI.updateJob(id, updated);
    await loadJobs();
  };

  const deleteJob = async (id) => {
    await jobAPI.deleteJob(id);
    await loadJobs();
  };

  const updateJobStatus = async (id, status) => {
    await jobAPI.updateJobStatus(id, status);
    await loadJobs();
  };

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        createJob,
        updateJob,
        deleteJob,
        updateJobStatus,
        refetch: loadJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error("useJobs must be used within a JobProvider");
  return ctx;
};
