const mongoose = require('mongoose');

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePic: {
      type: String,
      require: true,
      default:
        "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userModel);

module.exports = User;