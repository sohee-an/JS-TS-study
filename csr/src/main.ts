import { TGotoOptions } from "./types";

const routes: any = {
  "/": renedrIndex,
  "/search": renderSearch,
  "/replace": replaceIndex,
};

window.addEventListener("popstate", (event) => {
  if (routes[location.pathname]) {
    routes[location.pathname]();
    return;
  }
});

const goto = (url: string, { push, replace }: TGotoOptions = {}) => {
  const pathnameArr = url.split("?");
  const params = Object.fromEntries(new URLSearchParams(url.split("?")[1]));

  if (routes[pathnameArr[0]]) {
    if (replace) {
      // 현재 히스토리 항목을 대체 (뒤로가기 불가)
      history.replaceState({}, "", url);
    } else if (push) {
      history.pushState({}, "", url);
    }

    routes[pathnameArr[0]]({ searchParams: params });
    return;
  }
  location.href = url;
};

function renedrIndex() {
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

function renderSearch({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  document.querySelector("#app")!.innerHTML = `
    <h1>Search Results</h1>
    <p>${searchParams.query}</p>
   
  `;
}

function replaceIndex() {
  document.querySelector("#app")!.innerHTML = `<h1>replace 화면</h1>`;
}

goto(location.pathname + location.search);
