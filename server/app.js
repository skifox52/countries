const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
//Model
const countriesScema = new mongoose.Schema({
  name: String,
  code: String,
})
const countriesModel = mongoose.model("countrie", countriesScema)
app.get("/countries", async (req, res) => {
  const { page } = req.query
  const skip = (page - 1) * 10
  const count = await countriesModel.countDocuments()
  const pages = Math.ceil(count / 10)
  const result = await countriesModel.find({}).skip(skip).limit(10)
  res.status(200).json({
    pages,
    result,
  })
})
mongoose
  .connect(
    "mongodb+srv://skifox:skifox123@cluster0.ryhzsjm.mongodb.net/Countries?retryWrites=true&w=majority"
  )
  .then(app.listen(5000, () => console.log("app listenning")))
  .catch((err) => console.log(err))
