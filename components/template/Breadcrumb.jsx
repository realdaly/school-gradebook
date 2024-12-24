import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { useTheme } from "@/components/template/ConfigContext";
import Subjects from "@/components/template/Subjects";
import Terms from "./Terms";
import ImportDatabaseBtn from "@/components/template/ImportDatabaseBtn";
import ExportDatabaseBtn from "@/components/template/ExportDatabaseBtn";

export default function Breadcrumb({tools, children}){
    const { accentColor, loading } = useTheme();

    return(
        <>
            {!loading &&
                <div className="m-1">
                    <div className="flex items-center justify-between flex-wrap gap-y-1">
                        <div className="flex gap-x-1 items-center flex-wrap gap-y-1">
                            <Link href="/">
                                <GoHomeFill className={`size-8 text-white bg-${accentColor} p-1.5 rounded-full transition-all hover:opacity-75`} />
                            </Link>
                            <Subjects />
                            <Terms />
                        </div>
                        <div className="flex gap-x-1 items-center flex-wrap gap-y-1">
                            {tools}
                            <ImportDatabaseBtn />
                            <ExportDatabaseBtn />
                        </div>
                    </div>
                    <div className="flex gap-x-2 items-center pt-1">
                        {children}
                    </div>
                </div>

            }
        </>
    );
}