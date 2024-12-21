import { useTheme } from "@/components/template/ConfigContext";
import Settings from "@/components/template/Settings";
import { IoMdRefreshCircle } from "react-icons/io";

export default function Header(){
    const { accentColor, title, loading } = useTheme();

    return(
        <>
            {!loading &&
                <div className={`h-14 w-full flex items-center justify-center relative px-5 space-x-10 bg-${accentColor} text-white`}>
                    <h1 className="text-2xl font-bold">
                        {title}
                    </h1>
                    <button
                        className="p-2 absolute -left-0 transition-all hover:rotate-180"
                        onClick={() => window.location.reload()}
                        title="تحديث الصفحة"
                    >
                        <IoMdRefreshCircle className="size-7" />
                    </button>
                    <Settings />
                </div>
            }
        </>
    );
}