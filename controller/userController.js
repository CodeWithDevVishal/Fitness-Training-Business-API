const User = require("../model/user");
const Blog = require("../model/blog");
const Comment = require("../model/comment");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

exports.getuserAdmin = async (req, res) => {
    try {
        const data = await User.find();
        return res.json({ errors: false, data: data });
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message });
    }
}
exports.getuser = async (req, res) => {
    try {
        const data = await User.find();
        return res.json({ errors: false, data: { name: data.name, email: data.email, createdAt: data.createdAt } });
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message });
    }
}

exports.postUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) return res.status(500).json({ errors: true, message: "user already exists" });
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const data = await User.create(req.body);
        return res.json({ errors: false, data: { name: data.name, email: data.email } });
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists) return res.status(500).json({ errors: true, message: "Account not found" });

        const verifyPassword = await bcrypt.compare(req.body.password, userExists.password);
        if (!verifyPassword) return res.status(500).json({ errors: true, message: "Account not found" });

        const token = await jwt.sign({ userId: userExists._id, username: userExists.name, role: userExists.role }, process.env.SEC, { expiresIn: '2h' })
        return res.json({ errors: false, data: { token: token, user: { name: userExists.name, email: userExists.email } } })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const check = await User.findById(req.params.id)
        if (!check) return res.status(404).json({ errors: true, message: "data not found" })
        const data = await User.findByIdAndDelete(req.params.id)
        if (data) await Blog.deleteMany({ userRef: data._id })
        if (data) await Comment.deleteMany({ userRef: data._id })
        return res.json({ errors: false, data: data, message: "Account deleted permantly" })
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}