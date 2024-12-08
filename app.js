const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;  // Use the dynamic port provided by Render or default to 3000 for local development

// MongoDB connection setup (with MongoDB Atlas or local connection)
const uri = process.env.MONGODB_URI || "mongodb+srv://mongodb1765:Azoxmozx123@yansu.lqxy1cs.mongodb.net/?retryWrites=true&w=majority&appName=YanSu"; // Use MongoDB URI from environment variables
const client = new MongoClient(uri);
let db;

(async () => {
    try {
        await client.connect();
        db = client.db("automation");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
})();

// Middleware setup
app.use(cors());
app.use(express.json());
app.set('views', './views')
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.static('public'));

// Endpoint to serve the HTML page
app.get("/", (req, res) => {
    res.render("index.ejs"); // Render the page using EJS
});

// Endpoint to add commands to the database
app.post("/commands", async (req, res) => {
    try {
        const command = req.body;
        const result = await db.collection("commands").insertOne(command);
        res.status(200).json({ message: "Command added successfully", result });
    } catch (err) {
        console.error("Error adding command:", err);
        res.status(500).json({ message: "Error adding command" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
