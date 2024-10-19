const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

require("./config/db");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const cookieParser = require('cookie-parser');

app.use(cookieParser());
const { scheduleDailyReminders } = require('./util/notification');

const userRoutes = require("./routes/userRoutes");
const habitRoutes = require("./routes/habitRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require('./routes/notificationRoutes');


app.use("/api/v1",userRoutes)
app.use("/api/v1/habit",habitRoutes)
app.use("/api/v1/admin",adminRoutes)
app.use('/api/v1/notifications', notificationRoutes);

// Start daily reminder scheduler
scheduleDailyReminders();

// swagger Ui
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: ' Habit_Tracker_Application  API',
        version: '1.0.0',
        description: 'API for managing Habit_Tracker_Application',
    },
    servers: [
        {
            url: 'http://localhost:5000/api', // Replace with your API base URL
        },
    ],
};
// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/userRoutes.js', './routes/adminRoutes.js','./routes/habitRoutes.js','./routes/notificationRoutes.js'], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/",(req,res)=>{
    res.send("<center><h1>Habit Tracker Application</h1><br>Get Recipe Api <a href=https://github.com/Devanshiballar/Habit_Tracker_Application.git target=_blank>Repository :Habit Tracker Application</a></center>")
  })
  
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });