import { PropsWithChildren } from "react";

export default function IconLink({
    children,
    rightSide,
    href,
}: { href: string; rightSide: React.ReactNode } & PropsWithChildren) {
    return (
        <a
            href={href}
            className="text-lg bg-blue-600 px-6 py-2 gap-1 rounded-full flex flex-row justify-around items-center"
        >
            <div>{children}</div>
            <div>{rightSide}</div>
        </a>
    );
}
