import Material from "../models/material.model.js";

export const getMaterialById = async (req, res, next) => {
    try {
        const material = await Material.findById(req.params.id );
        if (!material) {
            return res.status(404).json({ message: 'Size not found' });
        }
        res.status(200).json(material);
    } catch (err) {
        res.status(500).json("Not found!");
    }
}

export const getAllMaterial = async (req, res, next) => {
    try {
        const material = await Material.find();
        if (material) {
            res.status(200).json(material);
        } else {
            res.status(200).json("Not found!");
        }
    } catch (err) {
        res.status(500).json("Not found!");
    }
}

export const createMaterial = async (req, res) => {
    try {
        const newMaterial = await Material.create(req.body);
        res.status(201).json(newMaterial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMaterialById = async (req, res) => {
    try {
        const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMaterial) {
            return res.status(404).json({ message: 'Material not found' });
        }
        res.status(200).json(updatedMaterial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMaterialById = async (req, res) => {
    try {
        const deletedMaterial = await Material.findByIdAndDelete(req.params.id);
        if (!deletedMaterial) {
            return res.status(404).json({ message: 'Material not found' });
        }
        res.status(200).json({ message: 'Material deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
