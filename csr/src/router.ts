import { TGotoOptions } from "./types";
import { renedrIndex } from "./pages";
import { replaceIndex } from "./pages/replace";
import { renderSearch } from "./pages/search";

export const routes: Record<string, any> = {
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
