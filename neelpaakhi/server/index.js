import express from "express";
import mailchimp from "@mailchimp/mailchimp_marketing";

const app = express();
app.use(express.json());

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_KEY?.split("-").pop(),
});

const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
