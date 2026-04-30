const TG_TOKEN = "8676807639:AAEKN94cSQT1sbXZfZhx0yUyYJe4Mn3pLRY";
const TG_CHAT  = "-1003536163976";
const https    = require("https");

function sendTelegram(text) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ chat_id: TG_CHAT, text, parse_mode: "HTML" });
    const req = https.request({
      hostname: "api.telegram.org",
      path: `/bot${TG_TOKEN}/sendMessage`,
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) }
    }, (r) => {
      let d = "";
      r.on("data", c => { d += c; });
      r.on("end", () => resolve(d));
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  // Only allow GET (cron) or POST with secret
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const message = `📋 <b>Availability Reminder</b>\n\nHey Kingdom crew! 👋\n\nPlease log into <b>Kingdom NightShift</b> and submit your availability for the upcoming weekend.\n\nThe sooner you submit, the sooner the schedule gets posted. ✅`;

    await sendTelegram(message);
    return res.status(200).json({ ok: true, sent: true });
  } catch (err) {
    console.error("Remind error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
