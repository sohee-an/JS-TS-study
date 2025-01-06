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
  const params = Object.fromEntries(new URLSearchParams(url.split("?")[1]));

  if (routes[pathnameArr[0]]) {
    history.pushState({}, "", url);
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
    </form>
  `;
  document.body
    .querySelector("form")
    ?.addEventListener("submit", (event: any) => {
      event.preventDefault();
      goto(`/search?query=${event.target.query.value}`);
    });
}

function renderSearch({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  // const params = new URLSearchParams(url);
  // const value = params.get("query");
  console.log("url", searchParams);

  document.querySelector("#app")!.innerHTML = `
    <h1>Search Results</h1>
    <p>${searchParams.query}</p>
   
  `;
}

if (routes[location.pathname]) {
  routes[location.pathname](location.search);
} else {
  renedrIndex();
}
