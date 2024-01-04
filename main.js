//imports
const db=require ('./db')
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const errorHandler= require("./middleware/errorHandler")
db();
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is starting at port ${PORT}`);
});
