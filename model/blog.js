const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "./img/dark-bg.png"
    },
    categoryRef: {
        type: mongoose.Schema.ObjectId,
        ref: "category"
    },
    userRef: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    commentRef: [{
        type: mongoose.Schema.ObjectId,
        ref: "comment"
    }],


}, { timestamps: true });

module.exports = mongoose.model("blog", blogSchema);
