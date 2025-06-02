import Charger from "../models/Charger.js";

export const createCharger = async (req, res) => {
  try {
    const { name, location, status, powerOutput, connectorType } = req.body;

    // Basic structure validation
    if (
      !name ||
      !location?.latitude ||
      !location?.longitude ||
      !status ||
      !powerOutput ||
      !connectorType
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const newCharger = new Charger({
      name: name.trim(),
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      status,
      powerOutput,
      connectorType: connectorType.trim(),
      createdBy: req.user.id,
    });

    const savedCharger = await newCharger.save();
    res.status(201).json(savedCharger);
  } catch (error) {
    console.error("Error creating charger:", error);
    res.status(400).json({
      message: error.message || "Failed to create charger.",
    });
  }
};

export const getChargers = async (req, res) => {
  try {
    const { status, connectorType, minPower } = req.query;
    const filters = {};

    // Validate and sanitize status
    if (status?.trim()) {
      const trimmedStatus = status.trim();
      if (["Active", "Inactive"].includes(trimmedStatus)) {
        filters.status = trimmedStatus;
      } else {
        return res.status(400).json({ message: "Invalid status filter" });
      }
    }

    // Validate and sanitize connectorType
    if (connectorType?.trim()) {
      filters.connectorType = connectorType.trim();
    }

    // Validate and sanitize minPower
    if (minPower) {
      const minPowerNum = Number(minPower);
      if (!isNaN(minPowerNum) && minPowerNum >= 0) {
        filters.powerOutput = { $gte: minPowerNum };
      } else {
        return res.status(400).json({ message: "Invalid minPower filter" });
      }
    }

    const chargers = await Charger.find(filters).populate("createdBy", "email");

    res.status(200).json(chargers);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to fetch chargers." });
  }
};

export const updateCharger = async (req, res) => {
  try {
    const chargerId = req.params.id;

    // Validate ID format
    if (!chargerId || !mongoose.Types.ObjectId.isValid(chargerId)) {
      return res.status(400).json({ message: "Invalid charger ID." });
    }

    const charger = await Charger.findById(chargerId);
    if (!charger) {
      return res.status(404).json({ message: "Charger not found." });
    }

    // Restrict to creator only
    if (charger.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this charger." });
    }

    // Ensure no attempt to change `createdBy`
    if (req.body.createdBy) {
      delete req.body.createdBy;
    }

    const updatedCharger = await Charger.findByIdAndUpdate(
      chargerId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedCharger);
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to update charger.",
    });
  }
};

export const deleteCharger = async (req, res) => {
  try {
    const chargerId = req.params.id;

    // Validate ID format
    if (!chargerId || !mongoose.Types.ObjectId.isValid(chargerId)) {
      return res.status(400).json({ message: "Invalid charger ID." });
    }

    const charger = await Charger.findById(chargerId);
    if (!charger) {
      return res.status(404).json({ message: "Charger not found." });
    }

    // Restrict deletion to creator only
    if (charger.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this charger." });
    }

    await charger.deleteOne();

    res.status(200).json({ message: "Charger deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to delete charger." });
  }
};

export const getChargersByUser = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const { status, connectorType, minPower } = req.query;
    const filters = { createdBy: userId };

    // Validate and sanitize status
    if (status?.trim()) {
      const trimmedStatus = status.trim();
      if (["Active", "Inactive"].includes(trimmedStatus)) {
        filters.status = trimmedStatus;
      } else {
        return res.status(400).json({ message: "Invalid status filter" });
      }
    }

    // Validate and sanitize connectorType
    if (connectorType?.trim()) {
      filters.connectorType = connectorType.trim();
    }

    // Validate and sanitize minPower
    if (minPower) {
      const minPowerNum = Number(minPower);
      if (!isNaN(minPowerNum) && minPowerNum >= 0) {
        filters.powerOutput = { $gte: minPowerNum };
      } else {
        return res.status(400).json({ message: "Invalid minPower filter" });
      }
    }

    const chargers = await Charger.find(filters).populate("createdBy", "email");

    res.status(200).json(chargers);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to fetch user's chargers." });
  }
};
