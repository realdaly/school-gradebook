import Link from "next/link";
import { useTheme } from "@/components/template/ConfigContext";

export default function BreadcrumbBtn({href, label}){
    const { accentColor } = useTheme();

    return(
        <Link 
            className={`text-white bg-${accentColor} py-1.5 px-2 rounded-full`}
            href={href}
        >
            {label}
        </Link>
    );
}