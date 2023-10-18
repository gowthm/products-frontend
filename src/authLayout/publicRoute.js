import { Navigate, Outlet } from "react-router-dom";
import { SessionStorage } from "../utils/helper";

function PublicRoute() {
  let isAuth = SessionStorage();
  return !isAuth ? <Outlet /> : <Navigate to={{ pathname: "/" }} />;
}

export default PublicRoute;
