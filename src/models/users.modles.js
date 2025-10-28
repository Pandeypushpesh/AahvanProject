import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid mobile number"],
    },
    alternateMobile: {
      type: String,
      match: [/^[6-9]\d{9}$/, "Please enter a valid alternate mobile number"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    address: {
      house: { type: String, required: true },
      locality: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      pincode: {
        type: String,
        required: true,
        match: [/^\d{6}$/, "Please enter a valid 6-digit pincode"],
      },
      country: { type: String, default: "India" },
    },
    education: {
      type: String,
      required: [true, "Education field is required"],
    },
    profession: {
      type: String,
      required: [true, "Profession field is required"],
    },
    previousAssociation: {
      type: String,
      default: "None",
    },
    volunteerPrograms: {
      type: [String],
      default: [],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
