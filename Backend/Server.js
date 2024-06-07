const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
// Load environment variables
dotenv.config();

// Ensure required environment variables are set
if (!process.env.MONGO_URI || !process.env.PORT) {
    console.error("Error: MONGO_URI and PORT must be set in .env file");
    process.exit(1);
}

// Create Express app
const app = express();

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Path: ${req.path}, Method: ${req.method}`);
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        // Start the server
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit with failure
    });

// API Routes
const dataRoutes = require('./Routes/DataRoutes');
app.use('/api/tasks', dataRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Default route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
