const jwt = require("jsonwebtoken")

const isAdmin = async (req, res, next) => {
    try {
        const token = await req.header("auth-token")
        if (!token) return res.status(401).json({ errors: true, message: "unauthenticated request, invalid token" })
        const verifyToken = jwt.verify(token, process.env.SEC)
        if (!verifyToken) return res.status(401).json({ errors: true, message: "unauthenticated request, invalid token" })
        if (verifyToken.role != "admin") return res.status(401).json({ errors: true, message: "unauthenticated request, invalid token" })
        next()
    } catch (error) {
        return res.status(401).json({ errors: true, message: "unauthenticated request, invalid token" + error.message })
    }
}

module.exports = isAdmin 