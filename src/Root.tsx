import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

export default function Root() {
    return (
        <div>
            <NavBar />
            <div className="relative overflow-hidden block mt-[var(--navbar-height)]">
                <Outlet />
            </div>
        </div>
    );
}
