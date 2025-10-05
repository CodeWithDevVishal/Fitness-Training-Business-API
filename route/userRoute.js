const route = require("express").Router();
const { getuser, postUser, login, deleteUser} = require("../controller/userController");
const allowAdminOrAuth = require("../middleware/allowAdminOrAuth");
const isAdmin = require("../middleware/isAdmin");

route.get("/", isAdmin, getuser)
route.post("/", postUser)
route.post("/login", login)
route.delete("/:id", allowAdminOrAuth, deleteUser)

module.exports = route