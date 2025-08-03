const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: Number,
      default: null,
    },
    tokenExpiresAt: {
      type: mongoose.Schema.Types.Mixed,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("user", userSchema);

module.exports = Users;
