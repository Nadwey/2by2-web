import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react";
import IconLink from "../components/icon-link/IconLink";
import logo from "../img/2by2-logo-anim.gif";

export default function Home() {
    return (
        <div className="w-full flex flex-col gap-3 items-center mt-10">
            <img src={logo} alt="2by2 logo" />
            <div className="mt-10 flex flex-row gap-2">
                <IconLink href="/devices" rightSide={<IconArrowRight stroke={1.5} />}>
                    Devices
                </IconLink>
                <IconLink href="https://github.com/2by2-Project" rightSide={<IconBrandGithub stroke={1.5} />}>
                    GitHub
                </IconLink>
            </div>
            <span className="font-bold text-2xl">
                Note: This is an unofficial clone of the 2by2 project's website.
                <br />
                Made because the original website is kinda lacking, and I wanted to practice my design skills :)
                <br />
                The original website can be found{" "}
                <a className="text-blue-500" href="https://project2by2.jp/">
                    here
                </a>
                .
                <br />
                And the source code for this website can be found{" "}
                <a className="text-blue-500" href="https://github.com/Nadwey/2by2-web">
                    here
                </a>
                .
            </span>
        </div>
    );
}
