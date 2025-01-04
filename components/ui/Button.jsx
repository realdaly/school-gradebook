import { useTheme } from "@/components/template/ConfigContext";

export default function Button({setFunc, clickFunc, label, title, children, style}){
    const { accentColor } = useTheme();
    
    const onClickFunc = () => {
        if(setFunc){
            setFunc(prev => !prev);
        }
        if(clickFunc){
            clickFunc();
        }
    }
    
    return(
        <div 
            onClick={() => onClickFunc()}
            title={title}
            className={`text-white font-medium text-lg bg-${accentColor ?? "accent1"} py-0.5 px-3 text-center rounded-full w-fit transition-all hover:opacity-75 flex items-center justify-center gap-x-1 cursor-pointer select-none ${style}`}
        >
            {label}
            {children}
        </div>
    );
}