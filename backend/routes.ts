import { AuthRouter } from "./routers/auth";
import { CategoryRouter } from "./routers/category";
import { NewsRouter } from "./routers/news";

const ROUTES = [
  {
    path: "/auth",
    router: AuthRouter,
  },
  {
    path: "/category",
    router: CategoryRouter,
  },
  {
    path: "/news",
    router: NewsRouter,
  },
];

export default ROUTES;
