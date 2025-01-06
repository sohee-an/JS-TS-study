import express from "express";
import movies from "./movie.json" assert { type: "json" };
import cors from "cors"
import fs from 'fs'
const app = express();
const port = 3000;

app.use(cors())
// app.use(express.static('dist'))



app.get("/", (req, res) => {
 fs.readFile('dist/index.html',(err,file)=>{
  res.send(file.toString())
 })
});

app.get("/search", (req, res) => {
  const query = req.query.query.toLocaleLowerCase();

  const filterMoviews = movies.filter((movie) =>
    movie.title.toLocaleLowerCase().includes(query)
  );
  res.json(filterMoviews);
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
