import axios from "axios";

// Create a pre-configured axios instance
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// === Job APIs ===

/**
 * Fetch all jobs
 * @returns {Promise<Array>} List of jobs
 */
export const fetchJobs = async () => {
  try {
    const response = await api.get("/jobs");
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch jobs");
  }
};

/**
 * Create a new job entry
 * @param {Object} job - { title, company, description }
 * @returns {Promise<Object>} Created job
 */
export const createJob = async (job) => {
  try {
    const response = await api.post("/jobs", job);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to create job");
  }
};

/**
 * Update a job (PUT)
 * @param {string} id - Job ID
 * @param {Object} updatedJob - Fields to update
 * @returns {Promise<Object>}
 */
export const updateJob = async (id, updatedJob) => {
  try {
    const response = await api.put(`/jobs/${id}`, updatedJob);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to update job");
  }
};

/**
 * Delete a job by ID
 * @param {string} id
 * @returns {Promise<void>}
 */
export const deleteJob = async (id) => {
  try {
    await api.delete(`/jobs/${id}`);
  } catch (error) {
    handleError(error, "Failed to delete job");
  }
};

/**
 * Update job status with PATCH
 * @param {string} id
 * @param {string} status - e.g., "Applied", "Reviewed", "Arrived"
 * @returns {Promise<Object>}
 */
export const updateJobStatus = async (id, status) => {
  try {
    const response = await api.patch(`/jobs/${id}/status`, { status });
    return response.data;
  } catch (error) {
    handleError(error, "Failed to update job status");
  }
};

// === Generic error handler ===
const handleError = (error, fallbackMessage) => {
  const msg = error?.response?.data?.error || fallbackMessage;
  console.error(`[API ERROR]: ${msg}`);
  throw new Error(msg);
};
