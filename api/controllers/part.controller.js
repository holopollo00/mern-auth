import Part from '../models/part.model.js';

// Create a new part
export const createPart = async (req, res) => {
    try {
        const newPart = await Part.create(req.body);
        res.status(201).json(newPart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all parts
export const getAllParts = async (req, res) => {
    try {
        const parts = await Part.find();
        res.status(200).json(parts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get lasted parts
export const getLastedParts = async (req, res) => {
    try {
        const part = await Part.findOne().sort({ createdAt: -1 });
        console.log(part);
        res.status(200).json(part);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get part by ID
export const getPartById = async (req, res) => {
    try {
        const part = await Part.findById(req.params.id);
        if (!part) {
            return res.status(404).json({ message: 'Part not found' });
        }
        res.status(200).json(part);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update part by ID
export const updatePartById = async (req, res) => {
    try {
        const updatedPart = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPart) {
            return res.status(404).json({ message: 'Part not found' });
        }
        res.status(200).json(updatedPart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete part by ID
export const deletePartById = async (req, res) => {
    try {
        const deletedPart = await Part.findByIdAndDelete(req.params.id);
        if (!deletedPart) {
            return res.status(404).json({ message: 'Part not found' });
        }
        res.status(200).json({ message: 'Part deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

