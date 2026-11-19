import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../lib/globalContext";

export default function LoginPage() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        setUser({
            email: data.get("email"),
            password: data.get("password")
        });
        navigate("/");
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="w-150 h-fit p-4 border border-black/25 rounded-xl flex justify-center items-start flex-col">
                <form className="w-full items-center flex flex-col justify-start gap-4" onSubmit={handleSubmit} action="">
                    <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label className="text-lg" htmlFor="email">email</label>
                        <input placeholder="your@mail.com" className="w-full border border-black/25 rounded-lg p-4" name="email" id="email" type="email" />
                    </div>
                    <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label className="text-lg" htmlFor="password">password</label>
                        <input placeholder="password" className="w-full border border-black/25 rounded-lg p-4" name="password" id="password" type="password" />
                    </div>

                    <button className="w-full p-4 rounded-lg bg-black text-white cursor-pointer" type="submit">
                        Login
                    </button>

                    <Link className="w-full p-4 rounded-lg border border-black text-center" to={"/"}>Back Home</Link>
                </form>
            </div>
        </div>
    );
}
