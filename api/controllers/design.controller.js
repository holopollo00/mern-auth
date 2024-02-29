import Design from '../models/designs.model.js';

// Get all designs
export const getAllDesigns = async (req, res) => {
  try {
    const designs = await Design.find();
    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single design by ID
export const getDesignById = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }
    res.status(200).json(design);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new design
export const createDesign = async (req, res) => {
  const design = new Design(req.body);
  try {
    const newDesign = await design.save();
    res.status(201).json(newDesign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a design by ID
export const updateDesignById = async (req, res) => {
  try {
    const updatedDesign = await Design.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDesign) {
      return res.status(404).json({ message: 'Design not found' });
    }
    res.status(200).json(updatedDesign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a design by ID
export const deleteDesignById = async (req, res) => {
  try {
    const deletedDesign = await Design.findByIdAndDelete(req.params.id);
    if (!deletedDesign) {
      return res.status(404).json({ message: 'Design not found' });
    }
    res.status(200).json({ message: 'Design deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
