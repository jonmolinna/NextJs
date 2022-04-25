import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Ingrese un titulo"],
  },
  plot: {
    type: String,
    required: [true, "Ingrese un plot"],
  },
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
