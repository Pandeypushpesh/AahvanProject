import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ----------------------------
// Registration Schema
// ----------------------------
const registrationSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/,
    },

    alternateMobile: {
      type: String,
      match: /^[0-9]{10}$/,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    address: {
      house: { type: String, trim: true },
      locality: { type: String, trim: true },
      district: { type: String, trim: true },
      state: { type: String, trim: true },
      city: { type: String, trim: true },
      pincode: { type: String, match: /^[1-9][0-9]{5}$/ },
      country: { type: String, default: "India" },
    },

    education: {
      type: String,
      required: true,
    },

    profession: {
      type: String,
      required: true,
    },

    previousAssociation: {
      type: String,
    },

    volunteerPrograms: {
      type: [String],
      default: [],
    },

    otpVerifiedPhone: {
      type: Boolean,
      default: false,
    },

    otpVerifiedEmail: {
      type: Boolean,
      default: false,
    },

    paymentAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["Success", "Pending", "Failed"],
      default: "Pending",
    },

    paymentId: {
      type: String,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ----------------------------
// Auto-generate Registration ID
// Example: AHV2025-00001
// ----------------------------
registrationSchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await mongoose.model("Registration").countDocuments();
    this.registrationId = `AHV${new Date().getFullYear()}-${(count + 1)
      .toString()
      .padStart(5, "0")}`;
  }
  next();
});

// ----------------------------
// Indexes for Query Optimization
// ----------------------------
registrationSchema.index({ email: 1 });
registrationSchema.index({ mobile: 1 });
registrationSchema.index({ registrationId: 1 });

// ----------------------------
// Export Model
// ----------------------------
const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
