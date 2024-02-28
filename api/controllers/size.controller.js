import Size from '../models/size.model.js';

// Create a new size
export const createSize = async (req, res) => {
    try {
        const newSize = await Size.create(req.body);
        res.status(201).json(newSize);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all sizes
export const getAllSizes = async (req, res) => {
    try {
        const sizes = await Size.find();
        res.status(200).json(sizes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get size by ID
export const getSizeById = async (req, res) => {
    try {
        const size = await Size.findById(req.params.id);
        if (!size) {
            return res.status(404).json({ message: 'Size not found' });
        }
        res.status(200).json(size);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update size by ID
export const updateSizeById = async (req, res) => {
    try {
        const updatedSize = await Size.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSize) {
            return res.status(404).json({ message: 'Size not found' });
        }
        res.status(200).json(updatedSize);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete size by ID
export const deleteSizeById = async (req, res) => {
    try {
        const deletedSize = await Size.findByIdAndDelete(req.params.id);
        if (!deletedSize) {
            return res.status(404).json({ message: 'Size not found' });
        }
        res.status(200).json({ message: 'Size deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

