import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { useTheme } from "@/components/template/ConfigContext";

export default function Breadcrumb({children}){
    const { accentColor, loading } = useTheme();

    return(
        <>
            {!loading &&
                <div className="h-10 w-fit rounded-full m-1 mr-1.5 flex gap-x-2 items-center">
                    <Link href="/">
                        <GoHomeFill className={`size-9 text-white bg-${accentColor} p-1.5 rounded-full`} />
                    </Link>
                    {children}
                </div>

            }
        </>
    );
}