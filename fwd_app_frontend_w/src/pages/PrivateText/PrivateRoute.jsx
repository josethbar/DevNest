import { Route, Navigate } from "react-router-dom";
// import FwdApp from "../FwdApp/FwdApp";

const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
