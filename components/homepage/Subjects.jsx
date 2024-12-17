import DropdownMenu from "@/components/ui/DropdownMenu";
import readSubjects from "@/utils/classpage/readSubjects";
import { useEffect, useState } from "react";
import { ImBooks } from "react-icons/im";
import Button from "@/components/ui/Button";

export default function Subjects({setFirstSubjectId}){
    const [data, setData] = useState([]);

    useEffect(() => {
       readSubjects(setData, setFirstSubjectId); 
    }, []);

    return(
        <DropdownMenu
            btn={
                <Button
                    label="المواد الدراسية"
                >
                    <ImBooks className="size-5" />
                </Button>
            }
        >
            {data.map(item => (
                <p 
                    className="px-5 py-1 first:pt-2 transition-all hover:bg-comp hover:text-black cursor-pointer"
                    key={item.id}
                >
                    {item.name}
                </p>
            ))}
            <p 
                className="px-5 py-1 transition-all hover:bg-comp hover:text-black cursor-pointer"
                // onClick={() => setIsOpen(true)}
            >
                إضافة مادة +
            </p>
        </DropdownMenu>
    );
}