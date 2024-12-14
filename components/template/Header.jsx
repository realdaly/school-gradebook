import { useTheme } from "@/components/template/ConfigContext";
import Settings from "@/components/template/Settings";

export default function Header(){
    const { accentColor, title, loading } = useTheme();

    return(
        <>
            {!loading &&
                <div className={`h-14 w-full flex items-center justify-center relative px-5 space-x-10 bg-${accentColor} text-white`}>
                    <h1 className="text-xl font-bold">
                        {title}
                    </h1>
                    <Settings />
                </div>
            }
        </>
    );
}