import express from "express";
import movies from "./movie.json" assert { type: "json" };

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
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
