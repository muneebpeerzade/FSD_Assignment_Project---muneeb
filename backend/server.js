const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient("mongodb://localhost:27017");
let db;

client.connect().then(() => {
  db = client.db("jobtracker");
  console.log("✅ DB connected");
});

// GET all jobs
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await db.collection("jobs").find().toArray();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// GET single job
app.get("/jobs/:id", async (req, res) => {
  try {
    const job = await db.collection("jobs").findOne({ _id: new ObjectId(req.params.id) });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

// CREATE job
app.post("/jobs", async (req, res) => {
  try {
    const { title, company, description } = req.body;
    if (!title || !company) return res.status(400).json({ error: "Title and company are required" });

    const newJob = {
      title,
      company,
      description: description || "",
      status: "Applied",
      history: [{ status: "Applied", timestamp: new Date() }]
    };

    const result = await db.collection("jobs").insertOne(newJob);
    res.status(201).json(result.ops?.[0] || newJob);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job" });
  }
});

// UPDATE status (PATCH)
app.patch("/jobs/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["Applied", "Reviewed", "Arrived"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const job = await db.collection("jobs").findOne({ _id: new ObjectId(id) });
    if (!job) return res.status(404).json({ error: "Job not found" });

    const statusExists = job.history.some(entry => entry.status === status);
    const allStatusesCovered = validStatuses.every(s => job.history.some(entry => entry.status === s));

    if (statusExists) {
      return res.status(409).json({ error: `Status '${status}' already recorded` });
    }

    if (allStatusesCovered) {
      return res.status(400).json({ error: "All statuses already added" });
    }

    await db.collection("jobs").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { status },
        $push: { history: { status, timestamp: new Date() } }
      }
    );

    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// UPDATE job (PUT)
app.put("/jobs/:id", async (req, res) => {
  try {
    const { title, company, description } = req.body;
    const updateFields = {};
    if (title) updateFields.title = title;
    if (company) updateFields.company = company;
    if (description) updateFields.description = description;

    const result = await db.collection("jobs").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update job" });
  }
});

// DELETE job
app.delete("/jobs/:id", async (req, res) => {
  try {
    const result = await db.collection("jobs").deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

app.listen(3001, () => console.log("🚀 Server running on http://localhost:3001"));
