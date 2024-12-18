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
            className={`text-white font-bold text-xl bg-${accentColor} py-1.5 px-3 text-center rounded-full mx-auto w-fit transition-all hover:opacity-75 flex items-center justify-center gap-x-1 cursor-pointer ${style}`}
        >
            {label}
            {children}
        </div>
    );
}