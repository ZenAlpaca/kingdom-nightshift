const SB_URL = "https://xihxsenzdubgmopkrvsz.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpaHhzZW56ZHViZ21vcGtydnN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjkwNDQ2NCwiZXhwIjoyMDkyNDgwNDY0fQ.yNbTa5eTaMbGD7KiKOroTnm0FM0Q2pRqOKuueJWtFmM";

const HEADERS = {
  apikey: SB_KEY,
  Authorization: `Bearer ${SB_KEY}`,
  "Content-Type": "application/json",
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,x-operation");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    // GET reads from query string
    if (req.method === "GET") {
      const { table, params } = req.query;
      if (!table) return res.status(400).json({ error: "table required" });
      const url = `${SB_URL}/rest/v1/${table}${params ? "?" + params : ""}`;
      const r = await fetch(url, { method: "GET", headers: HEADERS });
      const text = await r.text();
      if (!r.ok) return res.status(r.status).json({ error: text });
      return res.status(200).json(text ? JSON.parse(text) : []);
    }

    // All write operations use POST with x-operation header to indicate the real operation
    const body = req.body || {};
    const { table, data, match } = body;
    const operation = req.headers["x-operation"] || req.method;

    if (!table) return res.status(400).json({ error: "table required" });

    let sbUrl = `${SB_URL}/rest/v1/${table}`;
    let sbMethod = "POST";
    const headers = { ...HEADERS };
    let sbBody = undefined;

    if (operation === "POST") {
      sbMethod = "POST";
      sbBody = JSON.stringify(data);
      headers.Prefer = "return=representation";
    } else if (operation === "PATCH") {
      sbMethod = "PATCH";
      sbUrl += `?${match}`;
      sbBody = JSON.stringify(data);
      headers.Prefer = "return=representation";
    } else if (operation === "DELETE") {
      sbMethod = "DELETE";
      sbUrl += `?${match}`;
    } else if (operation === "UPSERT") {
      sbMethod = "POST";
      sbBody = JSON.stringify(data);
      headers.Prefer = "resolution=merge-duplicates,return=representation";
    } else {
      return res.status(400).json({ error: "Unknown operation: " + operation });
    }

    const r = await fetch(sbUrl, { method: sbMethod, headers, body: sbBody });
    const text = await r.text();
    if (!r.ok) {
      console.error(`Supabase ${operation} ${table} failed:`, r.status, text);
      return res.status(r.status).json({ error: text });
    }
    return res.status(200).json(text ? JSON.parse(text) : []);

  } catch (err) {
    console.error("DB proxy error:", err);
    return res.status(500).json({ error: err.message });
  }
}

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
