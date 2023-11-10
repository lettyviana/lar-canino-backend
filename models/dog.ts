import mongoose, { Schema } from "mongoose";

const dogSchema = new Schema({
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
});

const Dog = mongoose.models.Dog || mongoose.model("Dog", dogSchema);

export default Dog;
