const express = require('express');
const categoryRoutes = require('./category/routes');
const laureateRoutes = require('./laureate/routes');
const nominationRoutes = require('./nomination/routes');
const prizeRoutes = require('./prize/routes');

const app = express();
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Activity 1");
});

app.use("/api/V1/category", categoryRoutes);
app.use("/api/V1/laureate", laureateRoutes);
app.use("/api/V1/nomination", nominationRoutes);
app.use("/api/V1/prize", prizeRoutes);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})