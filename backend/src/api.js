const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;

app.use("/admin", adminRoutes);

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
