import { Link } from "react-router-dom";

const links = [{ name: "Devices", path: "/devices" }];

export default function NavBar() {
    return (
        <div className="fixed top-0 left-0 right-0 h-[var(--navbar-height)] bg-zinc-950 border-b border-b-zinc-900 flex justify-center z-[1000]">
            <div className="w-full h-full flex flex-row justify-between items-center mx-4">
                <Link to="/" className="block font-black text-xl">
                    2by2 project
                </Link>
                <div>
                    {links.map(({ name, path }) => (
                        <Link key={path} to={path} className="mx-4">
                            {name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
