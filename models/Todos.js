const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
  description: String,
  complete: Boolean,
})

module.exports = mongoose.model("Todos", todoSchema)
