import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { RouterProvider } from "react-router/dom";
import { useState } from "react";
import { UserContext } from "./lib/globalContext";
import { useReducer } from "react";
import { userConstant } from "./contsant";
import useLocalStorage from "./hooks/localStorage";
import RegisterPage from "./pages/RegisterPage";
import Pos from "./pages/Pos";
import PosContextProvider from "./context/pos/PosContextProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/pos",
        element: (
           <PosContextProvider>
                <Pos />
           </PosContextProvider>
        ),
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

export default function App() {
    // const [user, setUser] = useState({});
    const { setStorage } = useLocalStorage("user", {});
    const [userState, userDispatcher] = useReducer((prevState, action) => {
        const { type, payload } = action;
        switch (type) {
            case userConstant.UPDATE: {
                const updatedData = {
                    email: payload.email || prevState.email,
                    username: payload.username || prevState.username,
                    password: window.btoa(
                        payload.password || prevState.password,
                    ),
                };
                setStorage(updatedData);
                return updatedData;
            }
            case userConstant.DELETE:
                return {};
            default:
                return prevState;
        }
    }, {});

    return (
        <UserContext.Provider value={{ userState, userDispatcher }}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    );
}
