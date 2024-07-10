// server.js
const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_IP = process.env.BACKEND_IP || "49.207.176.201/api";
const Client_BACKEND = process.env.Client_BACKEND || "http://localhost:5000";


app.use(cors({
  origin: 'http://localhost:7000'  // Adjust the origin as needed
}));



// Set the view engine to EJS
app.set("view engine", "ejs");
// Set the views directory to the correct path
app.set("views", path.join(__dirname, "views", "tests"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the "views/tests" directory
// Serve static files from the "views/tests" directory with correct MIME type for .js files
app.use(
  "/tests",
  express.static(path.join(__dirname, "views", "tests"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);
// Route to serve the index.html file
app.get("/", (req, res) => {
  res.render("login", { server_api: BACKEND_IP, client_api: Client_BACKEND });
});
app.get("/index", (req, res) => {
  res.render("index", { server_api: BACKEND_IP, client_api: Client_BACKEND });
});

// Dynamic route to serve test files with specific conditions
app.get("/test/:testname", (req, res) => {
  const testname = req.params.testname;
  let testFilePath = "";

  // Conditional logic to determine the file to serve
  if (testname === "motility") {
    testFilePath = "motility";
  } else if (testname === "morphology") {
    testFilePath = "morphology";
  } else if (testname === "measurement") {
    testFilePath = "measurement";
  } else if (testname === "vitality") {
    testFilePath = "Vitalitycapture";
  } else if (testname === "dna") {
    testFilePath = "dna_halo";
  } else if (testname === "capture") {
    testFilePath = "capture";
  } else {
    return res.status(404).send("Test not found");
  }

  // Render the test file with the backend IP variables
  res.render(testFilePath, {
    server_api: BACKEND_IP,
    client_api: Client_BACKEND,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
