import { useTheme } from "@/components/template/ConfigContext";

export default function Button({setFunc, label, title, children}){
    const { accentColor } = useTheme();
    const onClickFunc = () => {
        if(setFunc){
            setFunc(true);
        }
    }
    
    return(
        <div 
            onClick={() => onClickFunc()}
            title={title}
            className={`text-white font-bold bg-${accentColor} py-1.5 px-2 text-center rounded-full mx-auto transition-all hover:opacity-75 flex items-center justify-center gap-x-1 cursor-pointer`}
        >
            {label}
            {children}
        </div>
    );
}