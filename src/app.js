const express = require("express");
const chalk = require("chalk");
const path = require("path");
const hbs = require("hbs");

const forecast = require("./utlis/forecast");
const geocode = require("./utlis/geocode");
const app = express();
const publilcdirectirypath = path.join(__dirname, "../public");
const viewpath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialspath);
const creator = "created by pritom";

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    creator,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    creator,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "we are here to help you",
    problems: " please let us know your problems",
    creator,
  });
});

app.use(express.static(publilcdirectirypath));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you have to give an address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: " help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 page not found",
  });
});

app.listen(3000, () => {
  console.log(chalk.bold.red("server is up on port 3000"));
});
