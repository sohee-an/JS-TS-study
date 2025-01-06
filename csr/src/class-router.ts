import { TGotoOptions } from "./types";

export class Router {
  private routes: Record<string, any>;

  constructor(routes: Record<string, any>) {
    this.routes = routes;
    window.addEventListener("popstate", this.handlePopState);
  }

  public start() {
    this.goto(location.pathname + location.search);
  }

  public goto(url: string, options: TGotoOptions = {}) {
    const { push, replace } = options;
    const [pathname, search] = url.split("?");
    const params = Object.fromEntries(new URLSearchParams(search));

    const route = this.routes[pathname];
    if (route) {
      if (replace) {
        history.replaceState({}, "", url);
      } else if (push) {
        history.pushState({}, "", url);
      }
      route({ searchParams: params });
      return;
    }
    location.href = url;
  }

  private handlePopState = () => {
    const route = this.routes[location.pathname];
    if (route) {
      route();
    }
  };
}
