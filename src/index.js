const express = require("express");
const app = express();
const port = 3000;
const webRoutes = require("./mainRouter.js");
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", webRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});