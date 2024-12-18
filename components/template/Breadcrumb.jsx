import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { useTheme } from "@/components/template/ConfigContext";
import Subjects from "@/components/template/Subjects";
import Terms from "./Terms";

export default function Breadcrumb({children}){
    const { accentColor, loading } = useTheme();

    return(
        <>
            {!loading &&
                <div className="m-1">
                    <div className="flex gap-x-1 items-center">
                        <Link href="/">
                            <GoHomeFill className={`size-10 text-white bg-${accentColor} p-2 rounded-full transition-all hover:opacity-75`} />
                        </Link>
                        <Subjects />
                        <Terms />
                    </div>
                    <div className="flex gap-x-2 items-center pt-1">
                        {children}
                    </div>
                </div>

            }
        </>
    );
}