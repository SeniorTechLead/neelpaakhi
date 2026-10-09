import express from "express";
import mailchimp from "@mailchimp/mailchimp_marketing";

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "2kb" }));

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_KEY?.split("-").pop(),
});

const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

// Simple in-memory rate limit: 5 attempts per IP per 15 minutes
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of attempts) {
    if (now - entry.start > WINDOW_MS) attempts.delete(ip);
  }
}, WINDOW_MS).unref();

function rateLimit(req, res, next) {
  const now = Date.now();
  const entry = attempts.get(req.ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    attempts.set(req.ip, { start: now, count: 1 });
    return next();
  }
  if (++entry.count > MAX_ATTEMPTS) {
    return res.status(429).json({ error: "Too many attempts. Please try again later." });
  }
  next();
}

app.post("/api/subscribe", rateLimit, async (req, res) => {
  const { email, website } = req.body || {};

  // Honeypot: real users never see or fill this field
  if (website) {
    return res.json({ message: "You're on the list. We'll be in touch." });
  }

  if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    await mailchimp.lists.addListMember(AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });
    res.json({ message: "You're on the list. We'll be in touch." });
  } catch (err) {
    const title = err?.response?.body?.title;
    if (title === "Member Exists") {
      return res.status(409).json({ error: "You're already subscribed." });
    }
    console.error("Mailchimp error:", err?.response?.body || err.message);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

app.listen(3001, () => console.log("API listening on :3001"));
