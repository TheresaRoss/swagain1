const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Routers
const hospitals = require("./routes/hospitals");
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');

// Set app
const app = express();

//Body Parser
app.use(express.json());

app.use("/api/v1/hospitals", hospitals);
app.use('/api/v1/appointments', appointments);
app.use("/api/v1/auth", auth);

// Cookie Parser
app.use(cookieParser());

// APIs
app.get('/', (req, res) => {
    // res.send('<h1>Hello from express</h1>');
    // res.send({ name: "Brad" });
    // res.json({ name: "Brad" });
    // res.sendStatus(400);
    // res.status(400).json({ success: false });
    res.status(200).json({ success: true, data: { id: 1 } });
});

// Port and deploy
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log("Server running in ", process.env.NODE_ENV, " mode on port ", PORT));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});