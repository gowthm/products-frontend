import { Navigate, Outlet } from "react-router-dom";
import { SessionStorage } from "../utils/helper";

function PrivateRoute() {
  let isAuth = SessionStorage();

  return isAuth ? (
    <>
      <div className={""}>
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to={{ pathname: "/" }} />
  );
}

export default PrivateRoute;
