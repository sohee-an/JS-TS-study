import { shows } from "./data";

const groupedShows = shows.reduce((acc, cur_show) => {
  if (acc[cur_show.genre]) {
    acc[cur_show.genre].push(cur_show.title);
  } else {
    acc[cur_show.genre].push(cur_show.title);
  }
}, {});

console.log("dd", groupedShows);
