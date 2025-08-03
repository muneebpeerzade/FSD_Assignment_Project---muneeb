import { useState } from "react";
import { Plus, CircleX } from "lucide-react";
import JobList from "./components/JobList";
import { useJobs } from "./context/JobContext";
function App() {
  return (
    <div className="container mx-auto py-8 px-8 md:px-0 space-y-8">
      <div className="space-y-2">
      <h2>Internal Job Tracker</h2>
      <AddJob />
      </div>
      <JobList />
    </div>
  );
}

export default App;

function AddJob() {
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  const { createJob } = useJobs();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company) return;
    setIsAddJobModalOpen(false);
    try {
      await createJob(formData);
      setFormData({ title: "", company: "", description: "" });
    } catch (err) {
      console.error("Error adding job:", err.message);
      setIsAddJobModalOpen(true);
    }
  };
  return (
    <div>
      <button
        onClick={() => setIsAddJobModalOpen((prev) => !prev)}
        className="flex items-center justify-center w-full gap-2 rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
      >
        {isAddJobModalOpen ? (
          <>
            <CircleX className="w-4 h-4" /> Close
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add Job
          </>
        )}
      </button>
      {isAddJobModalOpen ? (
        <div className="pt-4 space-y-4">
          <h3>Job Details</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="title">title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Frontend Developer"
                />
              </div>
              <div>
                <label htmlFor="company">company</label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Acme Corp"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description">description</label>
              <textarea
                row="3"
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Optional job notes..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-500 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Submit
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
