import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export default function IconLink({
    children,
    rightSide,
    href,
}: { href: string; rightSide: React.ReactNode } & PropsWithChildren) {
    return (
        <Link
            to={href}
            className="text-lg bg-blue-600 px-6 py-2 gap-1 rounded-full flex flex-row justify-around items-center"
        >
            <div>{children}</div>
            <div>{rightSide}</div>
        </Link>
    );
}
