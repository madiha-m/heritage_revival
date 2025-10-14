const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    profileImage: { type: String, default: "" },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String },
    // telephone: { type: String },
    // telephoneCountry: { type: String },
    // telephoneCountryCode: { type: String },
    location: { type: String, required: true },
    linkedIn: { type: String },
    skills: [{ type: String }],
    otherSkills: { type: String },
    hoursContributed: { type: String },
    contributionHourlyRate: { type: String },
    discountOffered: { type: String },
    publicListing: { type: String },
    consentContact: { type: Boolean, required: true },
    country: { type: String },
    countryCode: { type: String },
    mobileNumber: { type: String },
    hourlyRate: { type: Number },
    isFullDay: { type: Boolean, default: false },
    workingHours: { type: Number, default: 8 },
    extraHours: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);
