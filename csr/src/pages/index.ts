import { goto } from "../router";

export function renedrIndex() {
  document.querySelector("#app")!.innerHTML = `
    <h1>Movie Info</h1>
    <form>
    <input type="search" name="query"/>
    <button type ="submit">Search</button>
      <a href="/replace">replace</a>
    </form>
  `;
  document.body
    .querySelector("form")
    ?.addEventListener("submit", (event: any) => {
      event.preventDefault();
      goto(`/search?query=${event.target.query.value}`, { push: true });
    });

  document.body.querySelector("a")?.addEventListener("click", (event) => {
    event.preventDefault();
    goto(`/replace`, { replace: true });
  });
}