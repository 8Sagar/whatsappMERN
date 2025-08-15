// routes/userRoute.js
import express from "express";
import User from "../models/user.js";

const router = express.Router();

// ✅ Add a new user (only if not exists)
router.post("/add", async (req, res) => {
  try {
    const data = req.body; // Full Google JWT payload
    let user = await User.findOne({ sub: data.sub }); // Check by Google user ID
    if (!user) {
      user = new User(data);
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
