const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    userRef: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    blogRef: {
        type: mongoose.Schema.ObjectId,
        ref: "blog"
    }
}, { timestamps: true });

module.exports = mongoose.model("comment", commentSchema);