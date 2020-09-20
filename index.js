const mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var app = express().use(bodyParser.json());

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "puhelinluettelo",
  multipleStatements: true, //out parametria varten aliohjelmassa
});
// yhteys
con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/users", (req, res) => {
  con.query("SELECT * FROM henkilot", function (error, results) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "users list." });
    res.json(results);
  });
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  con.query("SELECT * FROM henkilot WHERE id = " + id, function (
    error,
    results
  ) {
    if (error) throw error;
    res.json(results ? results : { message: "Not found" });
  });
});

// ADD kayttaja
app.post("/add", (req, res) => {
  const henkilo = req.body;
  console.log(henkilo);
  if (!henkilo) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user" });
  }

  con.query("INSERT INTO henkilot SET ?", henkilo, function (error, results) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "New user has been created successfully.",
    });
  });
});

// UPDATE kayttaja
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body;

  if (updatedUser.nimi != null && updatedUser.puhelin != null) {
    con.query(
      "UPDATE henkilot SET nimi = ?, puhelin = ? Where ID = ?",
      [updatedUser.nimi, updatedUser.puhelin, req.params.id],
      function (error, results) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results,
          message: "Name and number updated.",
        });
      }
    );
  } else if (updatedUser.nimi != null) {
    con.query(
      "UPDATE henkilot SET nimi = ? Where ID = ?",
      [updatedUser.nimi, req.params.id],
      function (error, results) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results,
          message: "Name only updated.",
        });
      }
    );
  } else if (updatedUser.puhelin != null) {
    con.query(
      "UPDATE henkilot SET puhelin = ? Where ID = ?",
      [updatedUser.puhelin, req.params.id],
      function (error, results) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results,
          message: "Number only updated.",
        });
      }
    );
  }
});

// DELETE kayttaja
app.delete("/users/:id", (req, res) => {
  con.query("DELETE FROM henkilot Where ID = ?", [req.params.id], function (
    error,
    results
  ) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "User deleted." });
  });
});

app.listen(3040, function () {
  console.log("Node app is running on port 3040");
});

//con.end((err) => {
// The connection is terminated gracefully
// Ensures all remaining queries are executed
// Then sends a quit packet to the MySQL server.
//});
