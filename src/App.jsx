import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { RouterProvider } from "react-router/dom";
import { useState } from "react";
import { UserContext } from "./lib/globalContext";

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
    const [user, setUser] = useState({});
    return (
        <UserContext.Provider value={{user,setUser}}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    );
}
