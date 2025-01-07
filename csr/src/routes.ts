import { renedrIndex } from "./pages";
import { replaceIndex } from "./pages/replace";
import { renderSearch } from "./pages/search";

export const routes: Record<string, any> = {
  "/": renedrIndex,
  "/search": renderSearch,
  "/replace": replaceIndex,
};
