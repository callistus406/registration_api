const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const routes = require("./api");
// global variables

const port = process.env.EXPRESS_PORT || 3000;

// middleWares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);

// listen to actions

app.listen(port, () => console.log(`app is running on ${port}`));
