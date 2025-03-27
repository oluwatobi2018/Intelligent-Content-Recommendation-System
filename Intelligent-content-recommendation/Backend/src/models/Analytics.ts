import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface for Analytics Document
 */
interface IAnalytics extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  contentId: mongoose.Schema.Types.ObjectId;
  action: "view" | "like" | "share" | "click";
  timestamp: Date;
}

/**
 * Analytics Schema
 */
const AnalyticsSchema = new Schema<IAnalytics>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    contentId: { type: Schema.Types.ObjectId, ref: "Content", required: true, index: true },
    action: { 
      type: String, 
      enum: ["view", "like", "share", "click"], 
      required: true 
    },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

/**
 * Pre-save Hook (Example: Logging or modifying data)
 */
AnalyticsSchema.pre<IAnalytics>("save", function (next) {
  console.log(`🔹 New Analytics Entry: ${this.userId} ${this.action} on ${this.contentId}`);
  next();
});

/**
 * Model Export
 */
export default mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);

