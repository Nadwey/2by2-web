import { Icon, IconAlertHexagon, IconAlertTriangle, IconCheck, IconInfoCircle, IconProps } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

type Variants = "info" | "success" | "warning" | "danger";

interface Variant {
    name: Variants;
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
    styles: string;
}

const variants: Variant[] = [
    { name: "info", icon: IconInfoCircle, styles: "bg-blue-500/25 border-l-blue-500" },
    { name: "success", icon: IconCheck, styles: "bg-green-500/25 border-l-green-500" },
    { name: "warning", icon: IconAlertTriangle, styles: "bg-yellow-500/25 border-l-yellow-500" },
    { name: "danger", icon: IconAlertHexagon, styles: "bg-red-500/25 border-l-red-500" },
];

export default function Admonition({ variant, children }: { variant: Variants; children: React.ReactNode }) {
    const { icon: Icon, styles } = variants.find((v) => v.name === variant) || variants[0];

    return (
        <div className={twMerge(styles, "p-4 border-l-4 rounded-xl w-fit")}>
            <div className="flex flex-row items-center gap-4">
                <Icon size={24} stroke={1.5} />
                <div>{children}</div>
            </div>
        </div>
    );
}
