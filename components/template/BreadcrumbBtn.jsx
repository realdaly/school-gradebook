import Link from "next/link";
import { useTheme } from "@/components/template/ConfigContext";

export default function BreadcrumbBtn({href, label}){
    const { accentColor } = useTheme();

    return(
        <Link 
            className={`text-${accentColor} pr-1 rounded-full text-xl transition-all hover:opacity-75`}
            href={href}
        >
            {label}
        </Link>
    );
}