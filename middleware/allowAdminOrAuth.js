const jwt = require("jsonwebtoken")

const allowAdminOrAuth = async (req, res, next) => {
    try {
        const token = await req.header("auth-token")
        if (!token) return res.status(401).json({ errors: true, message: "unauthenticated request, invalid token" })
        const verifyToken = jwt.verify(token, process.env.SEC)
        if (!verifyToken) return res.status(401).json({ errors: true, message: "unauthenticated request, invalid token" })
        if (verifyToken.role === "admin" || verifyToken.role === "user") {
            next()
        } else {
            return res.status(401).json({ errors: true, message: "unauthenticated request, invalid token" })
        }
    } catch (error) {
        res.status(500).json({ errors: true, message: error.message })
    }
}

module.exports = allowAdminOrAuth 