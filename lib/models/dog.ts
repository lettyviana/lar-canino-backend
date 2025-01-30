import mongoose, { Schema } from "mongoose";

const dogSchema = new Schema(
  {
    name: String,
    breed: String,
    image: String,
    imageDescription: String,
    gender: String,
    age: Number,
    behavior: [String],
    innoculations: String,
    diseases: String,
    parasites: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const DogModel = mongoose.models.dogs || mongoose.model("dogs", dogSchema);

export default DogModel;
