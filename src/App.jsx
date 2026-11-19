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
import ProfilePage from "./pages/ProfilePage";

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
        path: "/profile",
        element: <ProfilePage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

export default function App() {
    // const [user, setUser] = useState({});
    const userType = {
        email: "",
        username: "",
        password: "",
    };

    const [userState, userDispatcher] = useReducer((prevState, action) => {
        const { type, payload } = action;
        switch (type) {
            case userConstant.UPDATE_MEMORY: {
                const updatedData = {
                    username: payload.username || prevState.username,
                    email: payload.email || prevState.email
                };
                return updatedData;
            }
            case userConstant.UPDATE_STORAGE: {
                const updatedData = {
                    username: prevState.username,
                    email: payload.email || prevState.email,
                    password: window.btoa(
                        payload.password || prevState.password,
                    ),
                };
                payload.setStorage({
                    [prevState.username]: {
                        ...updatedData
                    }
                });
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
