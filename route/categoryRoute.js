const route = require("express").Router()
const { getCategory, postCategory, deleteCategory, putCategory } = require("../controller/categoryController")
const allowAdminOrAuth = require("../middleware/allowAdminOrAuth")
const isAdmin = require("../middleware/isAdmin")
// const isAuth = require("../middleware/isAuth")

route.get("/", allowAdminOrAuth, getCategory)
route.post("/", isAdmin, postCategory)
route.put("/:id", isAdmin, putCategory)
route.delete("/:id", isAdmin, deleteCategory)

module.exports = route