import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../lib/globalContext";

export default function HomePage() {
    const { user } = useContext(UserContext);
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="w-150 h-fit gap-6 p-4 border border-black/25 rounded-xl flex justify-center items-start flex-col">
                <Link className="w-full p-4 rounded-lg border border-black text-center" to="/login">Go to login</Link>
                <div className="w-full border rounded-lg p-4 border-black/25 flex justify-center items-center flex-col gap-2">
                    <h1 className="text-2xl w-full">Current user email</h1>
                    <span className="p-4 rounded-lg bg-slate-100 w-full">
                        {user.email || "No email yet please login"}
                    </span>
                </div>
            </div>
        </div>
    );
}
