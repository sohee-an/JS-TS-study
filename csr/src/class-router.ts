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
  // public start() {
  //   const { pathname, search } = window.location;
  //   const route = this.routes[pathname];

  //   if (route) {
  //     const params = search
  //       ? Object.fromEntries(new URLSearchParams(search))
  //       : {};

  //     route(params ? { searchParams: params } : undefined);
  //   } else {
  //     // 기본 라우트로 이동 (보통 메인 페이지)
  //     this.goto("/");
  //   }
  // }

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

  // private handlePopState = () => {
  //   const route = this.routes[location.pathname];
  //   if (route) {
  //     route();
  //   }
  // };
  private handlePopState = () => {
    const { pathname, search } = window.location;
    const route = this.routes[pathname];

    if (route) {
      const params = search
        ? Object.fromEntries(new URLSearchParams(search))
        : {};

      route({ searchParams: params });
    }
  };
}
