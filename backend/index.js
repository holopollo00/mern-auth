const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const responseDataRoute = require('./routes/responseData');
const userRoute = require('./routes/user');
const materialRoutes = require("./routes/material.route.js");
const sizeRoutes = require("./routes/size.route.js");
const designRoutes = require("./routes/design.route.js");
const partRoutes = require("./routes/part.route.js");
const designSaveRoutes = require("./routes/designSave.js");


dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("CONNECTED")
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/responseData", responseDataRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/material", materialRoutes);
app.use("/api/size", sizeRoutes);
app.use("/api/design", designRoutes);
app.use("/api/part", partRoutes);
app.use("/api/design-save", designSaveRoutes);

app.listen(3000, () => {
    console.log("Server is running");
})