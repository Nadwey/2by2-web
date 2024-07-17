import useSWR from "swr";
import { type Device, useDevice } from "../Devices";
import {
    Icon,
    IconArrowDown,
    IconCalendarEvent,
    IconDeviceMobile,
    IconFileDownload,
    IconProps,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { filesize } from "filesize";
import Admonition from "../../components/admonition/Admonition";

interface Build {
    datetime: number;
    filename: string;
    id: string;
    romtype: string;
    size: number;
    url: string;
    version: string;
    platform_version: string;
}

interface BuildsResponse {
    response: Build[];
}

function BuildProperty({
    icon,
    children,
}: {
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
    children: React.ReactNode;
}) {
    const Icon = icon;

    return (
        <div className="flex items-center gap-1">
            <Icon stroke={1.5} className="text-green-500" />
            <span>{children}</span>
        </div>
    );
}

function Changelog({ device }: { device: Device }) {
    const { data, isLoading } = useSWR<string>(
        `https://raw.githubusercontent.com/2by2-Project/android_vendor_2by2-ota/main/changelogs/${device.codename}.txt`,
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Failed to fetch changelog.</div>;
    }

    return <pre>{data}</pre>;
}

export default function Device() {
    const device = useDevice();
    const { data, isLoading } = useSWR<BuildsResponse>(
        `https://raw.githubusercontent.com/2by2-Project/android_vendor_2by2-ota/main/builds/${device?.codename}.json`,
    );

    const build = data?.response[0];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!build || !device) {
        return <div>Failed to fetch build details.</div>;
    }

    return (
        <div>
            <div className="flex flex-row items-center mb-2">
                <IconDeviceMobile size={48} stroke={1} />
                <div className="flex flex-col">
                    {device?.name} ({device?.codename})
                    <span className="text-xs text-zinc-400">Maintained by: {device?.maintainer}</span>
                </div>
            </div>
            {device?.copy_partitions && (
                <Admonition variant="warning">
                    The first time you flash this device, you'll need to flash the "copy-partitions.zip" file containing
                    the OTA files.
                    <br />
                    <a
                        className="text-blue-500"
                        href="https://sourceforge.net/projects/project2by2-test/files/misc/copy_partitions/copy-partitions-20220613-signed.zip/download"
                    >
                        Download
                    </a>
                </Admonition>
            )}
            <span className="block text-xl font-bold text-zinc-100 mt-2">Builds</span>
            <div className="flex flex-col gap-4 mt-2 w-fit">
                <div className="bg-zinc-900 rounded-lg shadow-lg">
                    <div className="p-4">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-green-500 leading-tight">
                                Version {build.version}
                            </span>
                            <span className="text-zinc-400 text-sm">Android {build.platform_version}</span>
                        </div>
                        <hr className="border-zinc-700 my-2" />
                        <div className="flex flex-col gap-2 text-zinc-400">
                            <BuildProperty icon={IconCalendarEvent}>
                                {dayjs(build.datetime * 1000).format("YYYY-MM-DD HH:MM")}
                            </BuildProperty>
                            <BuildProperty icon={IconFileDownload}>{filesize(build.size, { base: 2 })}</BuildProperty>
                            <div className="col-span-2">
                                <a
                                    href={build.url}
                                    className="flex flex-row gap-2 items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg"
                                >
                                    <IconArrowDown size={16} />
                                    {build.filename}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <span className="block text-xl font-bold text-zinc-100 mb-2">Recovery images</span>
            <div className="flex flex-row gap-2 mt-2">
                {device?.recovery_images.map((recoveryImage) => (
                    <a
                        href={`https://master.dl.sourceforge.net/project/project2by2-test/${device.codename}/${build.platform_version}/${recoveryImage}/${recoveryImage}.img?viasf=1`}
                        key={recoveryImage}
                        className="bg-zinc-900 rounded-md py-2 px-2"
                    >
                        <div className="flex flex-row gap-1 items-center justify-center">
                            <IconArrowDown size={16} />
                            <span className="text-zinc-200">{recoveryImage}.img</span>
                        </div>
                    </a>
                ))}
            </div>
            <span className="block text-xl font-bold text-zinc-100 mt-4 mb-2">Changelog</span>
            <Changelog device={device} />
        </div>
    );
}
