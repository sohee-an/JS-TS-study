import { renedrIndex } from "./pages";
import { replaceIndex } from "./pages/replace";
import { renderSearch } from "./pages/search";
import { start } from "./router";

start({
  routes: {
    "/": renedrIndex,
    "/search": renderSearch,
    "/replace": replaceIndex,
  },
});
