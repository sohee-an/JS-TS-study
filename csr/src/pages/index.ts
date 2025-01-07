import { router } from "../store/router-context";

export function getInitialHTML() {
  return `
  <h1>Movie Info</h1>
    <form>
    <input type="search" name="query"/>
    <button type ="submit">Search</button>
      <a href="/replace">replace</a>
    </form>
  `;
}

export function renedrIndex() {
  document.querySelector("#app")!.innerHTML = getInitialHTML();

  document.body
    .querySelector("form")
    ?.addEventListener("submit", (event: any) => {
      event.preventDefault();
      router.goto(`/search?query=${event.target.query.value}`, { push: true });
    });

  document.body.querySelector("a")?.addEventListener("click", (event) => {
    event.preventDefault();
    router.goto(`/replace`, { replace: true });
  });
}
