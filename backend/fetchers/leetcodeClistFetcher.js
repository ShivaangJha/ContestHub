const Contest = require("../models/contest");

function toDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

async function fetchLeetCodeContestsFromClist(options = {}) {
  const { includeRecentPastDays = 0 } = options;
  try {
    const { CLIST_USERNAME, CLIST_API_KEY } = process.env;
    if (!CLIST_USERNAME || !CLIST_API_KEY) {
      console.error("❌ CLIST_USERNAME or CLIST_API_KEY not set in .env");
      return;
    }

    const params = new URLSearchParams({
      resource: "leetcode.com",
      order_by: "start"
    });
    if (includeRecentPastDays > 0) {
      const startCutoff = new Date(Date.now() - includeRecentPastDays * 24 * 60 * 60 * 1000).toISOString();
      params.set("start__gte", startCutoff);
    } else {
      params.set("upcoming", "true");
    }

    const url = `https://clist.by/api/v2/contest/?${params.toString()}`;

    const basic = Buffer.from(`${CLIST_USERNAME}:${CLIST_API_KEY}`).toString("base64");

    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Basic ${basic}`,
        "User-Agent": "Contest-Tracker/1.0"
      }
    });

    let data;
    if (response.status === 401 || response.status === 403) {
      // Retry using query params authentication
      const retryParams = new URLSearchParams({
        resource: "leetcode.com",
        order_by: "start",
        username: CLIST_USERNAME,
        api_key: CLIST_API_KEY
      });
      if (includeRecentPastDays > 0) {
        const startCutoff = new Date(Date.now() - includeRecentPastDays * 24 * 60 * 60 * 1000).toISOString();
        retryParams.set("start__gte", startCutoff);
      } else {
        retryParams.set("upcoming", "true");
      }
      const retryUrl = `https://clist.by/api/v2/contest/?${retryParams.toString()}`;
      const retry = await fetch(retryUrl, {
        headers: {
          "Accept": "application/json",
          "User-Agent": "Contest-Tracker/1.0"
        }
      });
      if (!retry.ok) {
        console.error("❌ clist.by auth failed:", retry.status, retry.statusText);
        return;
      }
      data = await retry.json();
    } else {
      if (!response.ok) {
        console.error("❌ clist.by HTTP error:", response.status, response.statusText);
        return;
      }
      data = await response.json();
    }

    const contestsRaw = Array.isArray(data?.objects) ? data.objects : [];
    if (contestsRaw.length === 0) {
      console.log("⚠️ No upcoming LeetCode contests from clist.by");
      return;
    }

    const mapped = contestsRaw.map((c) => ({
      name: c.event || c.title || "LeetCode Contest",
      platform: "LeetCode",
      startTime: toDate(c.start),
      endTime: toDate(c.end) || toDate(c.finish) || toDate(c.start),
      url: c.href || "https://leetcode.com/contest/"
    })).filter((x) => x.startTime instanceof Date && !isNaN(x.startTime));

    if (mapped.length === 0) {
      console.log("⚠️ Parsed 0 valid contests from clist.by response");
      return;
    }

    try {
      await Contest.insertMany(mapped, { ordered: false });
      console.log(`✅ LeetCode contests (clist.by) saved to MongoDB (${mapped.length})`);
    } catch (insertError) {
      if (insertError?.code === 11000) {
        console.log("⚠️ Some contests already exist (duplicates skipped)");
      } else {
        console.error("❌ Error inserting clist.by contests:", insertError);
      }
    }
  } catch (err) {
    console.error("❌ Error fetching LeetCode contests from clist.by:", err);
  }
}

module.exports = fetchLeetCodeContestsFromClist;


