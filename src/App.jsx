import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { RouterProvider } from "react-router/dom";
import { useState } from "react";
import { UserContext } from "./lib/globalContext";
import { useReducer } from "react";
import { userConstant } from "./contsant";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

export default function App() {

    // const [user, setUser] = useState({});
    const [userState, userDispatcher] = useReducer((prevState, action) => {

        const { type, payload } = action;
        switch (type) {
            case userConstant.UPDATE:
                return {
                    email: payload.email || prevState.email,
                    username: payload.username || prevState.username,
                    password: payload.password || prevState.password
                };
            case userConstant.DELETE:
                return {};
            default:
                return prevState;
        }

    }, {});

    return (
        <UserContext.Provider value={{userState,userDispatcher}}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    );
}
