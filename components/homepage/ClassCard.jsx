import Link from "next/link";
import DeleteClassBtn from "@/components/homepage/DeleteClassBtn";
import UpdateClassBtn from "@/components/homepage/UpdateClassBtn";

export default function ClassCard({currentClass, fetchClasses}){
    return(
        <div className="flex w-3/4 border border-opacity-25 max-w-96 h-24 bg-white rounded-xl overflow-hidden hover:scale-105 transition-all">
            <Link 
                href={`/class?classlabel=${currentClass.title}&classid=${currentClass.id}&isliterary=${currentClass.is_literary}`}
                className="p-4 overflow-hidden w-full self-center"
            >
                <p className={`text-2xl font-bold text-${currentClass.theme} leading-loose overflow-hidden text-ellipsis whitespace-nowrap`}>
                    {currentClass.title}
                </p>
                <p className="overflow-hidden text-lg text-zinc-400">
                    عدد الطلاب: {currentClass.student_count}
                </p>
            </Link>
            <div className="flex items-center pl-3">
                <UpdateClassBtn 
                    currentClass={currentClass} 
                    fetchClasses={fetchClasses}
                />
                <DeleteClassBtn 
                    currentClass={currentClass} 
                    fetchClasses={fetchClasses}
                />
            </div>
            <svg width="16" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M 8 0 Q 4 4.8, 8 9.6 T 8 19.2 Q 4 24, 8 28.8 T 8 38.4 Q 4 43.2, 8 48 T 8 57.6 Q 4 62.4, 8 67.2 T 8 76.8 Q 4 81.6, 8 86.4 T 8 96 L 0 96 L 0 0 Z"
                    className={`fill-${currentClass.theme} stroke stroke-${currentClass.theme} stroke-2`}
                    strokeLinecap="round"
                ></path>
            </svg>
        </div>
    );
}