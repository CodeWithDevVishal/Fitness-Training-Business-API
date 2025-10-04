const route = require("express").Router();
const { getuser, postUser, login, deleteUser, getuserAdmin } = require("../controller/userController");
const allowAdminOrAuth = require("../middleware/allowAdminOrAuth");
const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");
// const isAuth = require("../middleware/isAuth");

route.get("/", isAdmin, getuserAdmin)
route.get("/", isAuth, getuser)
route.post("/", postUser)
route.post("/login", login)
route.delete("/:id", allowAdminOrAuth, deleteUser)

module.exports = route