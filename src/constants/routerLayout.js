import { Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";


export const getPublicRoutes = () => {
    return publicRoutes.map((prop, key) => {
        let Component = prop.component;
        return <Route path={prop.path} element={<Component />} key={key} />;
    });
};

export const getPrivateRoutes = () => {
    return privateRoutes.map((prop, key) => {
        let Component = prop.component;
        return <Route path={prop.path} element={<Component />} key={key} />;
    });
};