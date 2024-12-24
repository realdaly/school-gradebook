import { useTheme } from "@/components/template/ConfigContext";

export default function Button({setFunc, label, title, children, style}){
    const { accentColor } = useTheme();
    const onClickFunc = () => {
        if(setFunc){
            setFunc(prev => !prev);
        }
    }
    
    return(
        <div 
            onClick={() => onClickFunc()}
            title={title}
            className={`text-white font-medium text-lg bg-${accentColor} py-0.5 px-3 text-center rounded-full w-fit transition-all hover:opacity-75 flex items-center justify-center gap-x-1 cursor-pointer ${style}`}
        >
            {label}
            {children}
        </div>
    );
}