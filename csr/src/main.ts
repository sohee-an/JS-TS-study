import { router } from "./store/router-context";
import { getInitialHTML } from "./pages";
export { getInitialHTML };

if (typeof window !== "undefined") {
  router.start();
}
