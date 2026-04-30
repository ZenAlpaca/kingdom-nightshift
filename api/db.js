import https from "https";

const HOST = "xihxsenzdubgmopkrvsz.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpaHhzZW56ZHViZ21vcGtydnN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjkwNDQ2NCwiZXhwIjoyMDkyNDgwNDY0fQ.yNbTa5eTaMbGD7KiKOroTnm0FM0Q2pRqOKuueJWtFmM";

function sbReq(method, path, body, prefer) {
  return new Promise((resolve, reject) => {
    const str = body ? JSON.stringify(body) : "";
    const h = {
      "apikey": KEY,
      "Authorization": "Bearer " + KEY,
      "Content-Type": "application/json"
    };
    if (prefer) h["Prefer"] = prefer;
    if (str) h["Content-Length"] = Buffer.byteLength(str);

    const req = https.request(
      { hostname: HOST, path: "/rest/v1/" + path, method, headers: h },
      (r) => {
        let d = "";
        r.on("data", (c) => { d += c; });
        r.on("end", () => resolve({ status: r.statusCode, body: d }));
      }
    );
    req.on("error", reject);
    if (str) req.write(str);
    req.end();
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,x-operation");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const { table, params } = req.query;
      if (!table) return res.status(400).json({ error: "table required" });
      const r = await sbReq("GET", params ? `${table}?${params}` : table, null, null);
      return res.status(r.status).send(r.body);
    }

    const b = req.body || {};
    const table = b.table;
    const op = req.headers["x-operation"] || "POST";
    if (!table) return res.status(400).json({ error: "table required" });

    let path = table;
    let method = "POST";
    let prefer = "return=representation";
    let body = b.data;

    if (op === "PATCH") {
      method = "PATCH";
      path = `${table}?${b.match}`;
    } else if (op === "DELETE") {
      method = "DELETE";
      path = `${table}?${b.match}`;
      body = null;
      prefer = null;
    } else if (op === "UPSERT") {
      prefer = "resolution=merge-duplicates,return=representation";
    }

    const r = await sbReq(method, path, body, prefer);
    if (r.status >= 400) {
      console.error(`${op} ${table} failed:`, r.status, r.body);
      return res.status(r.status).json({ error: r.body });
    }
    return res.status(200).send(r.body || "[]");

  } catch(e) {
    console.error("Proxy error:", e.message);
    return res.status(500).json({ error: e.message });
  }
}
