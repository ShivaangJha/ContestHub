const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Contest model
const Contest = require("./models/contest");

// Import fetchers
const fetchCodeforcesContests = require("./fetchers/codeforcesFetcher");
const fetchLeetCodeContestsFromClist = require("./fetchers/leetcodeClistFetcher");
const fetchGfgContestsFromClist = require("./fetchers/gfgClistFetcher");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  const db = mongoose.connection;
  console.log("✅ MongoDB Connected");
  console.log(`📦 Using database: ${db.name}`);
})
.catch((err) => {
  console.error("❌ MongoDB Connection Error:", err);
  console.log("💡 Make sure MongoDB is running and .env file has correct MONGO_URI");
});

app.get("/", (req, res) => {
  res.send("Backend running!");
});

 

// Route to fetch LeetCode contests via clist.by
app.get("/api/fetch/leetcode", async (req, res) => {
  try {
    await fetchLeetCodeContestsFromClist({ includeRecentPastDays: Number(req.query.pastDays || 0) });
    res.send("✅ LeetCode contests (clist.by) fetched and stored!");
  } catch (err) {
    res.status(500).send("❌ Error fetching LeetCode contests (clist.by)");
  }
});

// Route to fetch GFG contests via clist.by
app.get("/api/fetch/gfg", async (req, res) => {
  try {
    await fetchGfgContestsFromClist({ includeRecentPastDays: Number(req.query.pastDays || 0) });
    res.send("✅ GFG contests (clist.by) fetched and stored!");
  } catch (err) {
    res.status(500).send("❌ Error fetching GFG contests (clist.by)");
  }
});

// Route to fetch Codeforces contests
app.get("/api/fetch/codeforces", async (req, res) => {
  try {
    await fetchCodeforcesContests({ includeRecentPastDays: Number(req.query.pastDays || 0) });
    res.send("✅ Codeforces contests fetched and stored!");
  } catch (err) {
    res.status(500).send("❌ Error fetching Codeforces contests");
  }
});

// Combined fetch: clears collection and repopulates from all sources
app.post("/api/fetch/all", async (req, res) => {
  const includeRecentPastDays = Number(req.query.pastDays || req.body?.pastDays || 0);
  try {
    await mongoose.connection.db.collection('Contests').deleteMany({});
    await Promise.all([
      fetchCodeforcesContests({ includeRecentPastDays }),
      fetchLeetCodeContestsFromClist({ includeRecentPastDays }),
      fetchGfgContestsFromClist({ includeRecentPastDays })
    ]);
    res.send("✅ Refreshed all contests");
  } catch (e) {
    console.error("❌ Error refreshing all contests:", e);
    res.status(500).send("❌ Error refreshing all contests");
  }
});

// Debug route: verify DB and count
app.get("/api/debug/db", async (req, res) => {
  try {
    const db = mongoose.connection;
    const count = await mongoose.connection.db.collection('Contests').countDocuments();
    res.json({ db: db.name, collection: 'Contests', count });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Hourly scheduler: wipe and refetch all
const ONE_HOUR_MS = 60 * 60 * 1000;
const RECENT_PAST_DAYS_DEFAULT = 14; // include contests finished in last 2 weeks

async function refreshAllContestsScheduled() {
  try {
    await mongoose.connection.db.collection('Contests').deleteMany({});
    await Promise.all([
      fetchCodeforcesContests({ includeRecentPastDays: RECENT_PAST_DAYS_DEFAULT }),
      fetchLeetCodeContestsFromClist({ includeRecentPastDays: RECENT_PAST_DAYS_DEFAULT }),
      fetchGfgContestsFromClist({ includeRecentPastDays: RECENT_PAST_DAYS_DEFAULT })
    ]);
    console.log("⏲️ Hourly refresh complete");
  } catch (e) {
    console.error("❌ Error during hourly refresh:", e);
  }
}

// Kick off immediately on boot, then hourly
refreshAllContestsScheduled();
setInterval(refreshAllContestsScheduled, ONE_HOUR_MS);
