const express = require("express");
const cors = require("cors");
const blogRouter = require("./route/blog-route");

require("./db");

// Create the server
const app = express();
app.use(cors());
app.use(express.json());

// Use the blog router
app.use("/api/blogs", blogRouter);

app.use("./api", (req, res) => {
  res.send("Hello World");
});

const PORT = 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
