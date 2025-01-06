export function renderSearch({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  document.querySelector("#app")!.innerHTML = `
    <h1>Search Results</h1>
    <p>${searchParams.query}</p>
   
  `;
}
