require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// console.log("COUTRIES_URL: ", process.env.COUTRIES_URL);
const countriesUrl = process.env.COUTRIES_URL;

// My site: Home Page
app.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "Home page" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// Countries: all = Home page
app.get("/countries", async (req, res) => {
  try {
    const { data } = await axios.get(`${countriesUrl}/all`);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// Country: details
app.get("/country/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { data } = await axios.get(`${countriesUrl}/name/${name}`);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Countries: queries: name
app.get("/country", async (req, res) => {
  // console.log(req.query);
  try {
    const { name } = req.query;
    const { data } = await axios.get(`${countriesUrl}/name/${name}`);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Countries: sort

app.get("/countries/sort", async (req, res) => {
  try {
    const { name } = req.query;
    const { data } = await axios.get(`${countriesUrl}/all`);

    if (name === "asc") {
      data.sort((a, b) => {
        return a.name.common
          .toLowerCase()
          .localeCompare(b.name.common.toLowerCase());
      });
    }

    if (name === "desc") {
      data.sort((a, b) => {
        return b.name.common
          .toLowerCase()
          .localeCompare(a.name.common.toLowerCase());
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  return res.status(404).json({ message: "Page not found" });
});

app.listen(3000, () => {
  console.log("Server started");
});
