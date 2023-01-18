require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
// const methodOverride = require("method-override")
const cors = require("cors")
const todosData = require('./utilities/data')
const Todos = require("./models/Todos")
const todosController = require("./controllers/todos")

// Environmental Variable
const app = express()
const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT || 3001


// Middleware
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors())
// app.use(methodOverride("method"))


// setting up mongoose------------------------------------------
mongoose.set("strictQuery", false)
mongoose.connect(
  mongoURI,
  () => {
    console.log("connected to MongoDB")
  },
  (e) => console.error(e)
)

// Seed route - populate the database for testing
app.get('/seed', async (req, res) => {
  await Todos.deleteMany({});
  await Todos.insertMany(todosData); // insert 1 databas call - create n number of database calls
  res.send('done!');
});

app.use("/todos", todosController) // telling server.js to get the routes from controllers/todos

app.listen(PORT, () => console.log("listening"))

