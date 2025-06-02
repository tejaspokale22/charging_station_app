import mongoose from "mongoose";

const chargerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Charger name is required"],
      trim: true,
    },
    location: {
      latitude: {
        type: Number,
        required: [true, "Latitude is required"],
        min: -90,
        max: 90,
      },
      longitude: {
        type: Number,
        required: [true, "Longitude is required"],
        min: -180,
        max: 180,
      },
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: [true, "Status is required"],
    },
    powerOutput: {
      type: Number,
      required: [true, "Power output (kW) is required"],
      min: [1, "Power output must be at least 1 kW"],
    },
    connectorType: {
      type: String,
      required: [true, "Connector type is required"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Charger", chargerSchema);
