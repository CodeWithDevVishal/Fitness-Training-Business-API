const Comment = require("../model/comment")
const Blog = require("../model/blog")

exports.getCommentAdmin = async (req, res) => {
    try {
        const data = await Comment.find().populate("userRef").populate("blogRef")
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}
exports.getComment = async (req, res) => {
    try {
        const data = await Comment.find()
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}

exports.postComment = async (req, res) => {
    try {
        const commentData = await Comment.create(req.body)
        if (commentData) await Blog.findByIdAndUpdate(commentData.blogRef, { $push: { commentRef: commentData._id } }, { new: true })
        return res.json({ errors: false, data: commentData })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const check = await Comment.findById(req.params.id)
        if (!check) return res.status(404).json({ errors: true, message: "data not found" })
        const commentData = await Comment.findByIdAndDelete(req.params.id)
        if (commentData) await Blog.findByIdAndUpdate(commentData.blogRef, { $pull: { commentRef: commentData._id } })
        return res.json({ errors: false, commentData: commentData })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}