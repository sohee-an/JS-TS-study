import { TGotoOptions } from "./types";

let routes: Record<string, any>;

window.addEventListener("popstate", (event) => {
  if (routes[location.pathname]) {
    routes[location.pathname]();
    return;
  }
});

export const goto = (url: string, { push, replace }: TGotoOptions = {}) => {
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

export const start = (params: Record<string, any>) => {
  routes = params.routes;
  goto(location.pathname + location.search);
};
