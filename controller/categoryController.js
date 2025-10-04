const Category = require("../model/category")

exports.getCategory = async (req, res) => {
    try {
        const data = await Category.find()
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}

exports.postCategory = async (req, res) => {
    try {
        const findData = await Category.find({ category: req.body })
        if (findData) return res.status(409).json({ errors: true, message: " duplicate data entry " })
        const data = await Category.create(req.body)
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}

exports.putCategory = async (req, res) => {
    try {
        const check = await Category.findById(req.params.id)
        if (!check) return res.status(404).json({ errors: true, message: "data not found" })
        const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const check = await Category.findById(req.params.id)
        if (!check) return res.status(404).json({ errors: true, message: "data not found" })
        const data = await Category.findByIdAndDelete(req.params.id)
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}