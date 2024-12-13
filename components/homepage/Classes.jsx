import { useEffect, useState } from "react";
import ClassCard from "@/components/ui/ClassCard";
import readClasses from "@/utils/homepage/readClasses";
import CreateClassBtn from "./createClassBtn";

export default function Classes(){
    const [data, setData] = useState([]);

    useEffect(() => {
       readClasses(setData); 
    });

    return(
        <>
            {
                !data || data.length === 0 ?
                <div className="flex items-start justify-center p-5">القائمة فارغة!</div>
                :
                <div className="flex items-start justify-center flex-wrap gap-x-5 gap-y-7 p-5">
                    {data.map(item => (
                        <ClassCard 
                            key={item.id}
                            currentClass={item}
                        />
                    ))}
                </div>
            }
            <CreateClassBtn 
                readClasses={readClasses}
            />
        </> 
    );
}