const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const countriesUrl = "https://restcountries.com/v3.1";

app.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "Home page" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// Countries: all
app.get("/countries", async (req, res) => {
  try {
    const { data } = await axios.get(`${countriesUrl}/all`);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// Country: details
app.get("/country/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { data } = await axios.get(`${countriesUrl}/name/${name}`);
    return res.status(200).json({ data });
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
