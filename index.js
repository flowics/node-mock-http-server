const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let data = {};
let fail = false;

app.get("/", (req, res) => {
  if (fail) {
    res.sendStatus(500);
  } else {
    res.json(data);
  }
});

app.put("/", (req, res) => {
  if (fail) {
    res.sendStatus(500);
  } else {
    data = req.body;
    res.json(data);
  }
});

app.put("/mode/fail", (req, res) => {
  fail = true;
  res.json({ fail });
});

app.put("/mode/ok", (req, res) => {
  fail = false;
  res.json({ fail });
});

app.get("/mode", (req, res) => {
  res.json({ fail });
});

app.listen(port, () => {
  console.log(`Mock Server listening at http://localhost:${port}`);
});
