import { Route, Navigate } from "react-router-dom";
// import PrivateText from "./PrivateText";
import FwdApp from "../FwdApp/FwdApp";

const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            element={isAuthenticated ? <FwdApp /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
