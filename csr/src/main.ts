const routes: any = {
  "/": renedrIndex,
  "/search": renderSearch,
};

window.addEventListener("popstate", (event) => {
  console.log("popstate", event);

  if (routes[location.pathname]) {
    routes[location.pathname]();
    return;
  }
});

const goto = (url: string) => {
  const pathnameArr = url.split("?");

  if (routes[pathnameArr[0]]) {
    history.pushState({}, "", url);
    routes[pathnameArr[0]](pathnameArr[1]);
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
    </form>
  `;
  document.body
    .querySelector("form")
    ?.addEventListener("submit", (event: any) => {
      event.preventDefault();
      goto(`/search?query=${event.target.query.value}`);
    });
}

function renderSearch(url: string) {
  const params = new URLSearchParams(url);
  const value = params.get("query");

  document.querySelector("#app")!.innerHTML = `
    <h1>Search Results</h1>
    <p>${value}</p>
   
  `;
}

renedrIndex();
