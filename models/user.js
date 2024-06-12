import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
