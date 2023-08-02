// Import required packages
const express = require("express"); 
require("dotenv").config(); 
const { connection } = require("./db");
const { router } = require("./routes/task.route"); 
var cors = require("cors"); 

// Create an instance of the express application
const app = express();

// Middlewares
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cors()); // Enable CORS for all routes

// Routes
app.use("/users", router); // Set the '/users' route to use the task router module

// Default route
app.get("/", (req, res) => {
  res.send("GET request to the homepage"); // Send a response for GET requests to the homepage
});


const PORT = process.env.PORT || 4500; // Use the PORT environment variable if available, otherwise use 3000

// Start the server
app.listen(PORT, async (req, res) => {
  try {
    await connection; 
    console.log("database is connected"); // Log a message when the database connection is successful
  } catch (err) {
    console.log(err.message); // Log any errors that occurred during the database connection
    console.log("server is not running.."); // Log a message if the server could not start due to database connection issues
  }
  console.log(`server is running on port ${PORT}`); // Log a message when the server is up and running
});
