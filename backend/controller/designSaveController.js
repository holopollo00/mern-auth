const DesignSave = require('../models/DesignSave.model.js'); // Assuming the model is exported correctly
const Material = require('../models/material.model.js');

const designSaveController = {
  // Get all design saves
  getAllDesignSaves: async (req, res) => {
    try {
      const designSaves = await DesignSave.find();
      res.status(200).json(designSaves);
    } catch (error) {
      console.error('Error getting design saves:', error);
      res.status(500).json({ message: 'Error getting design saves' });
    }
  },

  // Get design saves by user ID
  getByUserId: async (req, res) => {
    try {
      const userId = req.params.userId; // Assuming the user ID is in the request params
      const designSaves = await DesignSave.find({ userId: userId }); // Filter by userId
      res.status(200).json(designSaves);
    } catch (error) {
      console.error('Error getting design saves by user ID:', error);
      res.status(500).json({ message: 'Error getting design saves' });
    }
  },

  // Get a specific design save by ID
  getDesignSaveById: async (req, res) => {
    try {
      const designSave = await DesignSave.findById(req.params.id);
      if (!designSave) {
        return res.status(404).json({ message: 'Design save not found' });
      }
      res.status(200).json(designSave);
    } catch (error) {
      console.error('Error getting design save by ID:', error);
      res.status(500).json({ message: 'Error getting design save' });
    }
  },

  getDesignSaveViewById: async (req, res) => {
    try {
      const designSave = await DesignSave.findById(req.params.id);
      if (!designSave) {
        return res.status(404).json({ message: 'Design save not found' });
      }
      for (const key in designSave.materials) {
        // Find the material data from the Material model using the item ID
        const material = await Material.findById(designSave.materials[key].item);
        // Replace the ID in the designSave with the material data
        designSave.materials[key].item = material;
    }
        res.status(200).json(designSave);
    } catch (error) {
      console.error('Error getting design save by ID:', error);
      res.status(500).json({ message: 'Error getting design save' });
    }
  },

  // Create a new design save
  createDesignSave: async (req, res) => {
    try {
      const newDesignSave = new DesignSave(req.body);
      await newDesignSave.save();
      res.status(201).json(newDesignSave);
    } catch (error) {
      console.error('Error creating design save:', error);
      res.status(500).json({ message: 'Error creating design save' });
    }
  },

  // Update a design save
  updateDesignSave: async (req, res) => {
    try {
      const updatedDesignSave = await DesignSave.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Return the updated document
      );
      if (!updatedDesignSave) {
        return res.status(404).json({ message: 'Design save not found' });
      }
      res.status(200).json(updatedDesignSave);
    } catch (error) {
      console.error('Error updating design save:', error);
      res.status(500).json({ message: 'Error updating design save' });
    }
  },

  // Delete a design save
  deleteDesignSave: async (req, res) => {
    try {
      await DesignSave.findByIdAndDelete(req.params.id);
      res.status(204).json({ message: 'Design save deleted' });
    } catch (error) {
      console.error('Error deleting design save:', error);
      res.status(500).json({ message: 'Error deleting design save' });
    }
  },
};

module.exports = designSaveController;
