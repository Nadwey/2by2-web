import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import useSWR from "swr";

export interface Device {
    codename: string;
    manufacturer: string;
    name: string;
    maintainer: string;
    recovery_images: string[];
    copy_partitions?: boolean;
}

interface DevicesResponse {
    devices: Device[];
}

type ContextType = {
    device: Device | undefined;
};

function DeviceList({ devices }: { devices: Device[] }) {
    const manufacturers = Array.from(new Set(devices.map((device) => device.manufacturer)));

    return (
        <div className="flex flex-col gap-4">
            {manufacturers.map((manufacturer) => (
                <div key={manufacturer} className="p-4 bg-zinc-900 rounded-lg shadow">
                    <span className="text-xl font-bold text-green-500">{manufacturer}</span>
                    <br />
                    <div className="flex flex-col gap-2">
                        {devices
                            .filter((device) => device.manufacturer === manufacturer)
                            .map((device) => (
                                <Link key={device.codename} to={`/devices/${device.codename}`} className="block ml-3">
                                    <div className="flex flex-col">
                                        <span className="text-lg">{device.name}</span>
                                        <span className="text-zinc-300 text-sm">{device.codename}</span>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Devices() {
    const { codename } = useParams();
    const { data, isLoading } = useSWR<DevicesResponse>(
        "https://raw.githubusercontent.com/2by2-Project/android_vendor_2by2-ota/main/devices.json",
    );

    const device = data?.devices.find((device) => device.codename === codename);

    if (data) {
        return (
            <div className="flex flex-row items-stretch min-h-[calc(100vh-var(--navbar-height))]">
                <div className="block w-[24rem] border-r border-r-zinc-900">
                    <div className="w-full text-center my-3">
                        <span className="text-2xl font-bold">Devices</span>
                    </div>
                    <div className="block  mx-3">
                        {isLoading && <div>Loading...</div>}
                        {data && <DeviceList devices={data.devices} />}
                    </div>
                </div>
                <div className="w-full m-4">
                    {device ? (
                        <Outlet context={{ device }} />
                    ) : codename ? (
                        <div>Device "{codename}" not found</div>
                    ) : (
                        <div>Select a device</div>
                    )}
                </div>
            </div>
        );
    }
}

export function useDevice() {
    return useOutletContext<ContextType>().device;
}
