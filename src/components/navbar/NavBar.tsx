const links = [{ name: "Devices", path: "/devices" }];

export default function NavBar() {
    return (
        <div className="fixed top-0 left-0 right-0 h-[var(--navbar-height)] bg-zinc-950 border-b border-b-zinc-900 flex justify-center z-[1000]">
            <div className="w-full h-full flex flex-row justify-between items-center mx-4">
                <a href="/" className="block font-black text-xl">
                    2by2 project
                </a>
                <div>
                    {links.map(({ name, path }) => (
                        <a key={path} href={path} className="mx-4">
                            {name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
