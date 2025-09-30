// leetcodeFetcher.js
// node-fetch v3 is ESM-only; use dynamic import wrapper in CommonJS
const fetch = (...args) => import('node-fetch').then(({ default: fetchFn }) => fetchFn(...args));
const Contest = require("../models/contest");

function toDate(value) {
  if (!value) return null;
  // If numeric seconds or milliseconds
  if (typeof value === 'number') {
    // Heuristic: if it's 13 digits assume ms, if 10 digits assume seconds
    const isMillis = value > 1e12;
    return new Date(isMillis ? value : value * 1000);
  }
  // If string, let Date parse it
  return new Date(value);
}

async function fetchLeetCodeContests() {
  try {
    // Use a stable public mirror API for LeetCode contests
    const response = await fetch("https://kontests.net/api/v1/leetcode", {
      method: "GET",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Referer": "https://kontests.net/",
        "Origin": "https://kontests.net"
      }
    });

    if (!response.ok) {
      console.error("❌ LeetCode API HTTP error:", response.status, response.statusText);
      return;
    }

    const data = await response.json();

    // kontests.net returns an array of contests
    const contestsRaw = Array.isArray(data) ? data : (data.upcoming_contests || data.upcomingContests || data.contests || []);
    if (!Array.isArray(contestsRaw) || contestsRaw.length === 0) {
      console.log("⚠️ No upcoming contests found or API response invalid");
      return;
    }

    const mappedContests = contestsRaw.map(c => {
      const title = c.name || c.title || "LeetCode Contest";
      const start = c.start_time ?? c.startTime ?? c.startTimeMillis ?? c.startTimeMs ?? c.start_time_unix;
      const durationSeconds = c.duration ?? c.duration_seconds ?? c.durationSeconds ?? c.duration_in_seconds;
      const startDate = toDate(start);
      const endDate = startDate && durationSeconds ? new Date(startDate.getTime() + Number(durationSeconds) * 1000) : null;
      const slug = c.url?.split("/contest/")[1] || c.title_slug || c.titleSlug || c.slug;
      const url = c.url || (slug ? `https://leetcode.com/contest/${slug}` : "https://leetcode.com/contest/");

      return {
        name: title,
        platform: "LeetCode",
        startTime: startDate,
        endTime: endDate || startDate,
        url
      };
    }).filter(c => c.startTime instanceof Date && !isNaN(c.startTime));

    if (mappedContests.length === 0) {
      console.log("⚠️ Parsed 0 valid contests from API response");
      return;
    }

    try {
      await Contest.insertMany(mappedContests, { ordered: false });
      console.log(`✅ LeetCode contests saved to MongoDB (${mappedContests.length})`);
    } catch (insertError) {
      if (insertError.code === 11000) {
        console.log("⚠️ Some contests already exist (duplicates skipped)");
      } else {
        console.error("❌ Error inserting contests:", insertError);
      }
    }

  } catch (err) {
    console.error("❌ Error fetching LeetCode contests:", err);
  }
}

module.exports = fetchLeetCodeContests;
