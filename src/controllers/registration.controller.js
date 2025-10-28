import Registration from "../models/registration.model.js";

// -------------------- CREATE --------------------
export const createRegistration = async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({
      success: true,
      message: "Registration created successfully",
      data: registration,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating registration",
      error: error.message,
    });
  }
};

// -------------------- READ ALL --------------------
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
      error: error.message,
    });
  }
};

// -------------------- READ SINGLE --------------------
export const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration)
      return res.status(404).json({ success: false, message: "Record not found" });
    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching record",
      error: error.message,
    });
  }
};

// -------------------- UPDATE --------------------
export const updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!registration)
      return res.status(404).json({ success: false, message: "Record not found" });

    res.status(200).json({
      success: true,
      message: "Registration updated successfully",
      data: registration,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating record",
      error: error.message,
    });
  }
};

// -------------------- DELETE --------------------
export const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration)
      return res.status(404).json({ success: false, message: "Record not found" });

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting record",
      error: error.message,
    });
  }
};
