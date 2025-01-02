import { describe, it, expect } from "vitest";
import { shows } from "./data";

describe("reduce method", () => {
  it("calculates the total of an array", () => {
    const numbers = [1, 2, 3, 4, 5];

    // TODO: do something here
    const sum = numbers.reduce((acc, number) => acc + number, 0);
    expect(sum).toBe(15);
  });

  it("groups by genre", () => {
    // TODO: do something with `shows` here
    const groupedShows = shows.reduce((acc, cur_show) => {
      if (acc[cur_show.genre]) {
        acc[cur_show.genre].push(cur_show.title);
      } else {
        acc[cur_show.genre] = [cur_show.title]; // 새 배열 생성
      }
      return acc; // 누적값 반환 필수!
    }, {});

    expect(groupedShows).toEqual({
      Comedy: ["Don't Look Up"],
      Drama: ["Stranger Things", "Our Blues", "Inventing Anna"],
      Mistery: ["Dirk Gently's Holistic Detective Agency"],
      Mystery: ["Little Women"],
    });
  });

  it("groups by key (2)", () => {
    // TODO: do something with `shows` here

    const groupedShows = shows.reduce((acc, cur_show) => {
      // 현재 장르의 그룹이 있는지 찾기
      const existingGroup = acc.find((group) => group.genre === cur_show.genre);

      if (existingGroup) {
        // 있으면 titles에 추가
        existingGroup.titles.push(cur_show.title);
      } else {
        // 없으면 새 그룹 만들어서 배열에 추가
        acc.push({
          genre: cur_show.genre,
          titles: [cur_show.title],
        });
      }

      return acc;
    }, []);

    expect(groupedShows).toEqual([
      {
        genre: "Drama",
        titles: ["Stranger Things", "Our Blues", "Inventing Anna"],
      },
      {
        genre: "Mystery",
        titles: ["Little Women"],
      },
      {
        genre: "Comedy",
        titles: ["Don't Look Up"],
      },
      {
        genre: "Mistery",
        titles: ["Dirk Gently's Holistic Detective Agency"],
      },
    ]);
  });

  it("flattens array", () => {
    const nestedArray = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    // TODO: do something here
    const flatArray = nestedArray.reduce((acc, curr) => [...acc, ...curr], []);
    expect(flatArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("extracts writer names", () => {
    // TODO: do something with `shows` here
    const writerNames = shows.reduce((acc, cur_show) => {
      return [...acc, cur_show.writers].flat();
    }, []);
    expect(writerNames).toEqual([
      "Matt Duffer",
      "Ross Duffer",
      "Jessie Nickson-Lopez",
      "Kate Trefry",
      "Justin Doble",
      "Alison Tatlock",
      "Paul Dichter",
      "Jessica Mecklenburg",
      "Seo-Gyeong Jeong",
      "Hee-kyung Noh",
      "Shonda Rhimes",
      "Carolyn Ingber",
      "Jessica Pressler",
      "Nicholas Nardini",
      "Adam McKay",
      "Max Landis",
      "Douglas Adams",
    ]);
  });
});
