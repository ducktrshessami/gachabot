const express = require("express");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static("server"));
app.listen(PORT);

require("./index");
