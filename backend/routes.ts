import { AuthRouter } from "./routers/auth";
import { CategoryRouter } from "./routers/category";
import { NewsRouter } from "./routers/news";
import { UserRouter } from "./routers/user";

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
  {
    path: "/user",
    router: UserRouter,
  },
];

export default ROUTES;
