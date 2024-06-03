const express = require("express");
const path = require("path");

const app = express();

app.use(
  (req, res, next) => {
    console.log(req.method, req.url);
    next();
  },
  express.static('./front', {
    extensions: ['html'],
  }),
  express.static('./dist', {
    extensions: ['js', 'css'],
  }),
  express.static('./node_modules/shoutexp', {
    extensions: ['js'],
  })
);

app.listen(3000, () =>
  console.log("Server started on port 3000")
);