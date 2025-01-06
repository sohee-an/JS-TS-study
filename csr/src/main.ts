import { Router } from "./class-router";
import { createRouter } from "./function-router";
import { renedrIndex } from "./pages";
import { routes } from "./routes";

const router = new Router(routes);
router.start();

renedrIndex(router);

// const router = createRouter({ routes });
// router.start();
