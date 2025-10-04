const route = require("express").Router()
const { getComment, postComment, deleteComment, getCommentAdmin } = require('../controller/commentController')
const allowAdminOrAuth = require("../middleware/allowAdminOrAuth")
const isAdmin = require("../middleware/isAdmin")
const isAuth = require("../middleware/isAuth")

route.get("/", isAdmin, getCommentAdmin)
route.get("/", isAuth, getComment)
route.post("/", allowAdminOrAuth, postComment)
route.delete("/:id", allowAdminOrAuth, deleteComment)

module.exports = route