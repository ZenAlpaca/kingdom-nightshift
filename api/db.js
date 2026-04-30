const https = require("https");

const HOST = "xihxsenzdubgmopkrvsz.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpaHhzZW56ZHViZ21vcGtydnN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjkwNDQ2NCwiZXhwIjoyMDkyNDgwNDY0fQ.yNbTa5eTaMbGD7KiKOroTnm0FM0Q2pRqOKuueJWtFmM";

function request(method, path, body, prefer) {
  return new Promise((resolve, reject) => {
    const str = body ? JSON.stringify(body) : "";
    const h = {
      "apikey": KEY,
      "Authorization": "Bearer " + KEY,
      "Content-Type": "application/json"
    };
    if (prefer) h["Prefer"] = prefer;
    if (str) h["Content-Length"] = Buffer.byteLength(str);
    const req = https.request({ hostname: HOST, path: "/rest/v1/" + path, method, headers: h }, function(r) {
      var d = "";
      r.on("data", function(c) { d += c; });
      r.on("end", function() { resolve({ status: r.statusCode, body: d }); });
    });
    req.on("error", reject);
    if (str) req.write(str);
    req.end();
  });
}

module.exports = async function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,x-operation");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      var t = req.query.table;
      var p = req.query.params || "";
      if (!t) return res.status(400).json({ error: "table required" });
      var r1 = await request("GET", p ? t + "?" + p : t, null, null);
      return res.status(r1.status).send(r1.body);
    }

    var b = req.body || {};
    var table = b.table;
    var op = req.headers["x-operation"] || "POST";
    if (!table) return res.status(400).json({ error: "table required" });

    var path = table;
    var method = "POST";
    var prefer = "return=representation";
    var body = b.data;

    if (op === "PATCH") {
      method = "PATCH";
      path = table + "?" + b.match;
    } else if (op === "DELETE") {
      method = "DELETE";
      path = table + "?" + b.match;
      body = null;
      prefer = null;
    } else if (op === "UPSERT") {
      prefer = "resolution=merge-duplicates,return=representation";
    }

    var r2 = await request(method, path, body, prefer);
    if (r2.status >= 400) {
      console.error(op + " " + table + " failed:", r2.status, r2.body);
      return res.status(r2.status).json({ error: r2.body });
    }
    return res.status(200).send(r2.body || "[]");

  } catch(e) {
    console.error("Proxy error:", e.message);
    return res.status(500).json({ error: e.message });
  }
};
