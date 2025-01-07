import { renedrIndex } from "./pages";
import { replaceIndex } from "./pages/replace";
import { renderSearch } from "./pages/search";
import { getInitialHTML as getInitialHTMLIndex } from "./pages";
import { getInitialHTML as getInitialHTMLSearch } from "./pages/search";

export const routes: Record<string, any> = {
  "/": renedrIndex,
  "/search": renderSearch,
  "/replace": replaceIndex,
};

export const getInitialHTML: Record<string, any> = {
  "/": getInitialHTMLIndex,
  "/search": getInitialHTMLSearch,
};
