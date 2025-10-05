const Blog = require("../model/blog")
const Comment = require("../model/comment")

exports.getBlogAdmin = async (req, res) => {
    try {
        const data = await Blog.find().populate([
            { path: 'userRef' },
            { path: 'categoryRef' },
            { path: 'commentRef' }
        ]);
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}

exports.getBlog = async (req, res) => {
    try {
        const data = await Blog.find()
            .populate({ path: "userRef", select: ["_id", "name"] })
            .populate({ path: "categoryRef", select: ["_id", "category"] })
            .populate({
                path: "commentRef", select: ["_id", "comment", "createdAt"],
                populate: { path: "userRef", select: ["_id", "name"] }
            })
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}

exports.postBlog = async (req, res) => {
    try {
        const commentData = await Blog.create(req.body)
        const newBlogData = await Blog.findOne({ _id: commentData._id }).populate([
            { path: "userRef", select: ["_id", "name"] },
            { path: "categoryRef", select: ["_id", "category"] },
            { path: "commentRef", select: ["_id", "comment", "createdAt"] }
        ])
        return res.json({ errors: false, data: { newBlogData, commentData } })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const check = await Blog.findById(req.params.id)
        if (!check) return res.status(404).json({ errors: true, message: "data not found" })
        const data = await Blog.findByIdAndDelete(req.params.id)
        if (data) await Comment.deleteMany({ blogRef: data._id })
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}
