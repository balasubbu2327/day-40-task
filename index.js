import express from "express";

import fs from "fs";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT=process.env.PORT;
// NOTE: Read all file
app.get("/", (req, res) => {
  fs.readdir("./files", (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/time", (req, res) => {
  const currentDate = (Date) => {
    const date = Date.getDate();
    const month = Date.getMonth();
    const year = Date.getFullYear();
    const hours = Date.getHours();
    const minutes = Date.getMinutes();
    const seconds = Date.getSeconds();
    return `${date}-${month}-${year}_${hours}:${minutes}:${seconds}`;
  };

  const date = currentDate(new Date());
  const filename = new Date().getTime();
  fs.writeFile(`./files/${filename}.txt`, date, (err, data) => {
    if (err) console.log(err);
    res.status(200).send("File created successfully");
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);