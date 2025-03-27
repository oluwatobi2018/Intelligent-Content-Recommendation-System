import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface for Content Document
 */
interface IContent extends Document {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  tags: string[];
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Content Schema
 */
const ContentSchema = new Schema<IContent>(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    link: { type: String, trim: true },
    tags: { type: [String], default: [], index: true }, // Indexing for faster tag-based searches
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

/**
 * Pre-save Hook (Example: Logging or modifying data)
 */
ContentSchema.pre<IContent>("save", function (next) {
  console.log(`📌 New Content Created: ${this.title} by User: ${this.createdBy}`);
  next();
});

/**
 * Model Export
 */
export default mongoose.model<IContent>("Content", ContentSchema);

