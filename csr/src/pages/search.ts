export function getInitialHTML() {
  return ` <h1>Search Results</h1>
    <p></p>`;
}

export async function renderSearch({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  document.querySelector("#app")!.innerHTML = `
    <h1>Search Results</h1>
    <p>${searchParams.query}</p>
  `;
  const response = await fetch(
    `http://localhost:3000/search?query=${searchParams.query}`
  );
  const movies = await response.json();
  console.log("movies", movies);

  document.querySelector("#app")!.innerHTML = `
    <h1>Search Results</h1>
 ${movies
   .map(
     (movie: any) => `
    <div>
      <h5>${movie.title}</p>
    </div>
    `
   )
   .join("")}
  `;
}
