import { lazy } from "react";

const Home = lazy(() => import("../pages/home/home"));
const Products = lazy(() => import("../pages/products/products"));

var publicRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

var privateRoutes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },

];

export { publicRoutes, privateRoutes };
