const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
require("dotenv/config")

const userRoute = require("./route/userRoute")
const blogRoute = require("./route/blogRoute")
const categoryRoute = require("./route/categoryRoute")
const commentRoute = require("./route/commentRoute")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", async (req, res) => {
    res.send("api runing....")
})

app.use("/api/user", userRoute)
app.use("/api/blog", blogRoute)
app.use("/api/category", categoryRoute)
app.use("/api/comment", commentRoute)

app.listen(process.env.PORT, () => console.log("API listening..."));

async function dbConect() {
    try {
        const con = await mongoose.connect(process.env.DB)
        console.log(con.default.STATES.connected);
    } catch (error) {
        console.log(error.message);
    }
}
dbConect()

