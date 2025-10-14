const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const nodemailer = require("nodemailer");

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// GET /api/members - Get all members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/members/:id - Get a specific member
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/members - Create a new member
router.post("/", async (req, res) => {
  try {
    console.log("Received form data:", req.body); // Debug log
    // Validate required fields
    const { fullName, email, role, location, consentContact } = req.body;
    if (
      !fullName ||
      !email ||
      !role ||
      !location ||
      consentContact === undefined
    ) {
      return res
        .status(400)
        .json({
          message:
            "Required fields are missing: fullName, email, role, location, consentContact",
        });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const memberData = { ...req.body };
    // If profileImageFile is present (from form-data), convert to base64 and store in profileImage
    if (
      req.body.profileImageFile &&
      typeof req.body.profileImageFile === "string"
    ) {
      // Already base64 string from frontend
      memberData.profileImage = req.body.profileImageFile;
    } else if (req.body.profileImage) {
      // Already base64 or empty
      memberData.profileImage = req.body.profileImage;
    }
    // Remove profileImageFile from memberData if present
    delete memberData.profileImageFile;

    const member = new Member(memberData);
    const newMember = await member.save();

    // Send confirmation email
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to Heritage Support Network",
        html: `
                <h1>Welcome ${fullName}!</h1>
                <p>Thank you for joining the Heritage Support Network. Your submission has been received successfully.</p>
                <p>We will contact you soon with more details.</p>
                <br>
                <p>Best regards,<br>Heritage Revival Team</p>
            `,
      };
      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent to:", email);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't fail the response if email fails
    }

    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
