const express = require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors')

dotenv.config();
const authRoute = require("./routes/authRoutes");
const employeeRoute = require("./routes/employeeRoutes")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(
    process.env.ATLAS_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.error(err);
        console.log('Database connected')
    }
)
app.use("/harsha", employeeRoute)

app.use("/user", authRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`The server is up and running ${port}`);
});



