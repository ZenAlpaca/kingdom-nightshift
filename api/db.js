const SB_URL = "https://xihxsenzdubgmopkrvsz.supabase.co";
const SB_KEY = "sb_publishable_A9A2MNTWRLbBYiWn1Cpc6w_DmR1KJkc";

const HEADERS = {
  apikey: SB_KEY,
  Authorization: `Bearer ${SB_KEY}`,
  "Content-Type": "application/json",
};

export default async function handler(req, res) {
  // Allow all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    let table, match, params, prefer, data, fetchMethod;

    if (req.method === "GET") {
      // Read from query string
      table = req.query.table;
      params = req.query.params || "";
      let url = `${SB_URL}/rest/v1/${table}`;
      if (params) url += `?${params}`;
      const response = await fetch(url, { method: "GET", headers: HEADERS });
      const text = await response.text();
      if (!response.ok) return res.status(response.status).json({ error: text });
      return res.status(200).json(text ? JSON.parse(text) : []);
    }

    // All other methods read from body
    const body = req.body || {};
    table = body.table;
    if (!table) return res.status(400).json({ error: "table required" });

    let url = `${SB_URL}/rest/v1/${table}`;
    const headers = { ...HEADERS };
    let fetchBody = undefined;

    if (req.method === "POST") {
      fetchMethod = "POST";
      fetchBody = JSON.stringify(body.data);
      headers.Prefer = body.prefer || "return=representation";
    } else if (req.method === "PATCH") {
      fetchMethod = "PATCH";
      url += `?${body.match}`;
      fetchBody = JSON.stringify(body.data);
      headers.Prefer = "return=representation";
    } else if (req.method === "DELETE") {
      fetchMethod = "DELETE";
      url += `?${body.match}`;
    } else if (req.method === "UPSERT") {
      fetchMethod = "POST";
      fetchBody = JSON.stringify(body.data);
      headers.Prefer = "resolution=merge-duplicates,return=representation";
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const response = await fetch(url, { method: fetchMethod, headers, body: fetchBody });
    const text = await response.text();
    if (!response.ok) {
      console.error(`Supabase ${fetchMethod} ${table} failed:`, response.status, text);
      return res.status(response.status).json({ error: text });
    }
    res.status(200).json(text ? JSON.parse(text) : []);
  } catch (err) {
    console.error("DB proxy error:", err);
    res.status(500).json({ error: err.message });
  }
}
