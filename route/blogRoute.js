const route = require("express").Router()
const { getBlog, postBlog, deleteBlog, getBlogAdmin } = require("../controller/blogController")
const allowAdminOrAuth = require("../middleware/allowAdminOrAuth")
const isAdmin = require("../middleware/isAdmin")
const isAuth = require("../middleware/isAuth")

route.get("/", isAdmin, getBlogAdmin)
route.get("/", isAuth, getBlog)
route.post("/", allowAdminOrAuth, postBlog)
route.delete("/:id", allowAdminOrAuth, deleteBlog)

module.exports = route