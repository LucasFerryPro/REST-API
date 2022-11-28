const express = require('express');
const categoryRoutes = require('./src/category/routes');
const laureateRoutes = require('./src/laureate/routes');
const nominationRoutes = require('./src/nomination/routes');
const prizeRoutes = require('./src/prize/routes');

const app = express();
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Activity 1");
});

app.use("/api/V1/categories", categoryRoutes);
app.use("/api/V1/laureates", laureateRoutes);
app.use("/api/V1/nominations", nominationRoutes);
app.use("/api/V1/prizes", prizeRoutes);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})