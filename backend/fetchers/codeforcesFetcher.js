// node-fetch v3 is ESM-only; use dynamic import wrapper in CommonJS
const fetch = (...args) => import('node-fetch').then(({ default: fetchFn }) => fetchFn(...args));
const Contest = require("../models/contest");

function toDateFromSeconds(seconds) {
  if (seconds == null) return null;
  return new Date(Number(seconds) * 1000);
}

async function fetchCodeforcesContests() {
  try {
    const response = await fetch("https://codeforces.com/api/contest.list?gym=false", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Contest-Tracker/1.0 (+https://codeforces.com)"
      }
    });

    if (!response.ok) {
      console.error("❌ Codeforces API HTTP error:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    if (data.status !== "OK" || !Array.isArray(data.result)) {
      console.log("⚠️ Codeforces API returned invalid payload");
      return;
    }

    // Keep only upcoming contests
    const upcoming = data.result.filter(c => c.phase === "BEFORE");

    if (upcoming.length === 0) {
      console.log("⚠️ No upcoming Codeforces contests found");
      return;
    }

    const mapped = upcoming.map(c => {
      const start = toDateFromSeconds(c.startTimeSeconds);
      const end = start && c.durationSeconds != null
        ? new Date(start.getTime() + Number(c.durationSeconds) * 1000)
        : start;
      const id = c.id;
      const url = `https://codeforces.com/contest/${id}`;
      return {
        name: c.name || `Codeforces Contest ${id}`,
        platform: "Codeforces",
        startTime: start,
        endTime: end,
        url
      };
    }).filter(c => c.startTime instanceof Date && !isNaN(c.startTime));

    if (mapped.length === 0) {
      console.log("⚠️ Parsed 0 valid Codeforces contests from API response");
      return;
    }

    try {
      await Contest.insertMany(mapped, { ordered: false });
      console.log(`✅ Codeforces contests saved to MongoDB (${mapped.length})`);
    } catch (insertError) {
      if (insertError.code === 11000) {
        console.log("⚠️ Some Codeforces contests already exist (duplicates skipped)");
      } else {
        console.error("❌ Error inserting Codeforces contests:", insertError);
      }
    }

  } catch (err) {
    console.error("❌ Error fetching Codeforces contests:", err);
  }
}

module.exports = fetchCodeforcesContests;


