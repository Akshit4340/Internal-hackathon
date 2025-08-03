import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    bio: { type: String, default: "" },
    interests: [{ type: String }],
    photoUrl: { type: String, default: "" },
    isOrganizer: { type: Boolean, default: false },
    oauthProvider: { type: String }, // "google", "github", etc.
    oauthId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
