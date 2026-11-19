import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../lib/globalContext";
import { userConstant } from "../contsant";
import { useState } from "react";
import useLocalStorage from "../hooks/localStorage";
import { useEffect } from "react";

export default function RegisterPage() {
    const { userState ,userDispatcher } = useContext(UserContext);
    const navigate = useNavigate();
    const { storage, setStorage } = useLocalStorage("users", {});
    const [error, setError] = useState({ message: "" });

    useEffect(() => {
        if (userState?.username && userState?.email) {
            navigate("/profile");
            return;
        }
    },[]);

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const username = data.get("username");
        const password = data.get("password");
        const email = data.get("email");

        if (storage?.hasOwnProperty(username)) {
            setError({
                message: "user already registered",
            });
            return;
        }
        setStorage({
            ...storage,
            [username]: {
                username,
                email,
                password: btoa(password),
            },
        });
        navigate("/login");
    }
    return (
        <div>
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <div className="w-150 h-fit p-4 border border-black/25 rounded-xl flex justify-center items-start flex-col">
                    <form
                        className="w-full items-center flex flex-col justify-start gap-4"
                        onSubmit={handleSubmit}
                        action=""
                    >
                        {error.message && (
                            <div className="w-full p-4 rounded-lg bg-red-100 text-red-700 border border-red-700">
                                {error.message}
                            </div>
                        )}
                        <div className="w-full flex flex-col justify-start items-start gap-2">
                            <label className="text-lg" htmlFor="email">
                                username
                            </label>
                            <input
                                placeholder="username"
                                className="w-full border border-black/25 rounded-lg p-4"
                                name="username"
                                id="username"
                                type="text"
                            />
                        </div>
                        <div className="w-full flex flex-col justify-start items-start gap-2">
                            <label className="text-lg" htmlFor="email">
                                email
                            </label>
                            <input
                                placeholder="your@mail.com"
                                className="w-full border border-black/25 rounded-lg p-4"
                                name="email"
                                id="email"
                                type="email"
                            />
                        </div>
                        <div className="w-full flex flex-col justify-start items-start gap-2">
                            <label className="text-lg" htmlFor="password">
                                password
                            </label>
                            <input
                                placeholder="password"
                                className="w-full border border-black/25 rounded-lg p-4"
                                name="password"
                                id="password"
                                type="password"
                            />
                        </div>

                        <button
                            className="w-full p-4 rounded-lg bg-black text-white cursor-pointer"
                            type="submit"
                        >
                            Register
                        </button>

                        <div className="w-full flex items-center justify-center gap-4">
                            <Link
                                className="w-full p-4 rounded-lg border border-black text-center"
                                to={"/login"}
                            >
                                Login
                            </Link>
                            <Link
                                className="w-full p-4 rounded-lg border border-black text-center"
                                to={"/"}
                            >
                                Back Home
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
