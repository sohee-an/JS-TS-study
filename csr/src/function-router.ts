import { TGotoOptions } from "./types";

type Route = (params?: Record<string, string>) => void;
type Routes = Record<string, Route>;
type RouterOptions = {
  routes: Routes;
};

const createRouter = (options: RouterOptions) => {
  const { routes } = options;

  const handlePopState = () => {
    const route = routes[location.pathname];
    if (route) {
      route();
    }
  };

  const start = () => {
    window.addEventListener("popstate", handlePopState);
    goto(location.pathname + location.search);
  };

  const goto = (url: string, options: TGotoOptions = {}) => {
    const { push, replace } = options;
    const [pathname, search] = url.split("?");
    const params = Object.fromEntries(new URLSearchParams(search));

    const route = routes[pathname];
    if (route) {
      if (replace) {
        history.replaceState({}, "", url);
      } else if (push) {
        history.pushState({}, "", url);
      }
      route(params);
      return;
    }
    location.href = url;
  };

  return {
    start,
    goto,
  };
};

export { createRouter };
