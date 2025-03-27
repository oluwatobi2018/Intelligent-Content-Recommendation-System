import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

/**
 * Interface for TypeScript Type Safety
 */
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  preferences: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * User Schema
 */
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    preferences: { type: [String], default: [] }, // User interests for recommendations
    isActive: { type: Boolean, default: true }, // Soft deletion flag
  },
  { timestamps: true }
);

/**
 * Hash password before saving
 */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Compare input password with stored hash
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Index for efficient user lookups
 */
UserSchema.index({ email: 1 });

export default mongoose.model<IUser>("User", UserSchema);

