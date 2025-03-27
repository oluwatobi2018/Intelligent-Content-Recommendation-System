import mongoose, { Document, Schema } from "mongoose";

/**
 * Interface for TypeScript Type Safety
 */
interface IRecommendation extends Document {
  userId: mongoose.Types.ObjectId;
  recommendedContent: mongoose.Types.ObjectId[];
  algorithmUsed: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Recommendation Schema
 */
const RecommendationSchema = new Schema<IRecommendation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    recommendedContent: [{ type: Schema.Types.ObjectId, ref: "Content", required: true }],
    algorithmUsed: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

/**
 * Index for fast queries on user recommendations
 */
RecommendationSchema.index({ userId: 1 });

export default mongoose.model<IRecommendation>("Recommendation", RecommendationSchema);

